import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
    const {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    } = await fetchCardData();

    return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Collected" value={totalPaidInvoices} type="collected" />
          <Card title="Pending" value={totalPendingInvoices} type="pending" />
          <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
          <Card
            title="Total Customers"
            value={numberOfCustomers}
            type="customers"
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <Suspense fallback={<div>Loading chart...</div>}>
            <RevenueChart revenue={revenue} />
          </Suspense>
          <Suspense fallback={<div>Loading invoices...</div>}>
            <LatestInvoices latestInvoices={latestInvoices} />
          </Suspense>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Collected" value="$0.00" type="collected" />
          <Card title="Pending" value="$0.00" type="pending" />
          <Card title="Total Invoices" value={0} type="invoices" />
          <Card title="Total Customers" value={0} type="customers" />
        </div>
        <p className="mt-4 text-gray-600">
          Dashboard is loading... If data doesn't appear, the database connection may need to be re-seeded.
        </p>
      </main>
    );
  }
}