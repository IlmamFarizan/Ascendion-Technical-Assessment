"use client";

import DashboardLayout from "@/app/dashboard/layout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">
            🎉 Login Successful!
          </h1>
          <p className="text-gray-600">
            Welcome to your dashboard. You're now securely logged in.
          </p>
        </div>
      </main>
    </DashboardLayout>
  );
}
