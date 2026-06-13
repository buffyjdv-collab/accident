'use client';

import React, { useState } from 'react';
import { AccidentReport } from '@/lib/report-types';
import AccidentReportForm from '@/components/accident-report-form';
import AccidentRecordsTable from '@/components/accident-records-table';
import AccidentPrintView from '@/components/accident-print-view';
import { FileText, List, Printer, ShieldCheck } from 'lucide-react';

const tabs = [
  { value: 'new-report', label: 'New Report', shortLabel: 'New', icon: FileText },
  { value: 'records', label: 'Records', shortLabel: 'Records', icon: List },
  { value: 'print-report', label: 'Print Report', shortLabel: 'Print', icon: Printer },
] as const;

export default function Home() {
  const [activeTab, setActiveTab] = useState('new-report');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [printReport, setPrintReport] = useState<AccidentReport | null>(null);
  const [editReport, setEditReport] = useState<AccidentReport | null>(null);

  const handleEditReport = (report: AccidentReport) => {
    setEditReport(report);
    setActiveTab('new-report');
  };

  const handleEditCancel = () => {
    setEditReport(null);
    setActiveTab('records');
  };

  const handleFormSubmitted = () => {
    setRefreshTrigger((prev) => prev + 1);
    setEditReport(null);
    setActiveTab('records');
  };

  const handlePrintReport = (report: AccidentReport) => {
    setPrintReport(report);
    setActiveTab('print-report');
  };

  const handleBackFromPrint = () => {
    setActiveTab('records');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-slate-800 text-white shadow-lg print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-slate-700 p-2 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">
                  Accident Inspection Report
                </h1>
                <p className="text-xs text-slate-400">
                  Motor Vehicles Inspector — Report Management System
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 -mb-px" role="tablist">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-slate-800 text-slate-800'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content - All panels stay mounted, only visibility changes */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 print:p-0">
        <div className={activeTab === 'new-report' ? '' : 'hidden'}>
          <AccidentReportForm onSubmitted={handleFormSubmitted} editReport={editReport} onEditCancel={handleEditCancel} />
        </div>
        <div className={activeTab === 'records' ? '' : 'hidden'}>
          <AccidentRecordsTable
            refreshTrigger={refreshTrigger}
            onPrintReport={handlePrintReport}
            onEditReport={handleEditReport}
          />
        </div>
        <div className={activeTab === 'print-report' ? '' : 'hidden'}>
          <AccidentPrintView
            report={printReport}
            onBack={handleBackFromPrint}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <p>Motor Vehicles Inspector — Accident Inspection Report System</p>
            <p>Government of India — Transport Department</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
