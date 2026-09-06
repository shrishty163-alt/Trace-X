import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from supabase import create_client


# Load environment variables
load_dotenv(Path(__file__).with_name(".env"))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_KEY must be set in .env")

# Connect to Supabase
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()


# Allow the React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Backend is working!"}


@app.get("/test-supabase")
def test_supabase():
    try:
        response = (
            supabase
            .schema("public")
            .table("transactions")
            .select("id, sender, receiver, amount, created_at", count="exact")
            .limit(100)
            .execute()
        )

        return {
            "status": "success",
            "count": response.count,
            "transactions": response.data,
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


@app.get("/scan")
def scan_fraud():
    try:
        # Get transactions from Supabase
        response = (
            supabase
            .schema("public")
            .table("transactions")
            .select("id, sender, receiver, amount, created_at")
            .limit(1000)
            .execute()
        )

        transactions = response.data or []

        suspicious_accounts = set()
        circular_loops = []

        # Build transaction graph
        graph = {}

        for transaction in transactions:
            sender = transaction["sender"]
            receiver = transaction["receiver"]

            if sender not in graph:
                graph[sender] = []

            graph[sender].append(receiver)

        # Detect simple circular loops:
        # A -> B -> C -> A
        for account_a in graph:
            for account_b in graph.get(account_a, []):
                for account_c in graph.get(account_b, []):
                    if account_a in graph.get(account_c, []):

                        loop = [account_a, account_b, account_c]

                        # Avoid duplicate loops
                        if loop not in circular_loops:
                            circular_loops.append(loop)

                            suspicious_accounts.update(loop)

        # Calculate suspicious transaction amount
        suspicious_amount = 0

        for transaction in transactions:
            sender = transaction["sender"]
            receiver = transaction["receiver"]

            for loop in circular_loops:
                if sender in loop and receiver in loop:
                    suspicious_amount += float(transaction["amount"])
                    break

        return {
            "status": "success",
            "transactions_analyzed": len(transactions),
            "suspicious_accounts": len(suspicious_accounts),
            "suspicious_account_names": list(suspicious_accounts),
            "circular_loops_detected": len(circular_loops),
            "circular_loops": circular_loops,
            "suspicious_amount": suspicious_amount,
            "risk_level": "HIGH" if circular_loops else "LOW",
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }