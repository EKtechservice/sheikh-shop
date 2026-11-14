import React from "react";
import type { Metadata } from "next";
import { requireOwner } from "@/lib/auth";
import { getAdminProducts } from "./product-actions";
import AdminDashboardClient from "./AdminDashboardClient";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminFooter from "@/components/admin/AdminFooter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Owner Admin Dashboard | Sheikh's Shop",
  description: "Private inventory & price management dashboard.",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const owner = await requireOwner();
  const { products } = await getAdminProducts();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#0A0A0A] text-white">
      {/* 1. Dedicated Admin Top Navigation */}
      <AdminNavbar ownerEmail={owner.email} />

      {/* 2. Owner Admin Management Control Panel */}
      <main id="admin-main" className="flex-1 w-full bg-[#0A0A0A] text-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Welcome Banner */}
          <div className="rounded-2xl border border-white/10 bg-[#0D1016] p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B98B63]">
                Store Administration
              </span>
              <h1 className="mt-1 text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
                Product &amp; Price Manager
              </h1>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                Logged in as <strong className="text-white">{owner.email}</strong>. Changes saved here update your public shop instantly.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Sync Active</span>
            </div>
          </div>

          {/* Client Product Management Dashboard (Inventory Cards on Mobile, Table on Desktop) */}
          <AdminDashboardClient
            initialProducts={products}
            ownerEmail={owner.email}
          />
        </div>
      </main>

      {/* 3. Dedicated Admin Footer */}
      <AdminFooter ownerEmail={owner.email} />
    </div>
  );
}
