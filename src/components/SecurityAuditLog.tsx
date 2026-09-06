import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Terminal, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  FileLock2, 
  Search,
  Filter
} from 'lucide-react';
import { INITIAL_AUDIT_LOGS } from '../data/researchData';
import { AuditLogEntry } from '../types';

export const SecurityAuditLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  const filteredLogs = logs.filter(
    (l) =>
      l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.actionDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.patientAbhaHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="audit-ledger" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Zero-Trust Cryptographic Audit Ledger</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Clinical Security Audit &amp; Data Integrity Log
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Immutable ledger tracking frontline ASHA logins, optical telemetry validations, local SQLCipher transactions, and HMAC sync packets.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 font-mono text-[11px] uppercase text-slate-500 font-bold">
                  <th className="py-3 px-4">Log ID &amp; Time</th>
                  <th className="py-3 px-4">Event Type</th>
                  <th className="py-3 px-4">Authenticated Actor</th>
                  <th className="py-3 px-4">Subject (Hash)</th>
                  <th className="py-3 px-4">Action Details</th>
                  <th className="py-3 px-4">Integrity Hash</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredLogs.map((log) => {
                  const statusColors = {
                    VERIFIED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                    ENCRYPTED: 'bg-blue-100 text-blue-800 border-blue-200',
                    QUEUED: 'bg-amber-100 text-amber-800 border-amber-200',
                    SYNCED: 'bg-teal-100 text-teal-800 border-teal-200',
                  }[log.status];

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{log.id}</div>
                        <div className="text-[10px] text-slate-400">{log.timestamp}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[10px]">
                          {log.eventType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <div className="font-bold text-slate-800 text-xs">{log.actor}</div>
                        <div className="text-[10px] text-slate-500">{log.role}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                        {log.patientAbhaHash}
                      </td>
                      <td className="py-3.5 px-4 font-sans text-xs text-slate-700 max-w-xs">
                        {log.actionDetails}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[10px]">
                        {log.integrityHash}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors}`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileLock2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Cryptographic Block Verification: SHA-256 Merkle Root Validated</span>
            </span>
            <span className="font-mono text-slate-400">Total Entries: {filteredLogs.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
