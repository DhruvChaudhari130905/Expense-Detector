import { useState } from 'react'
import BillUploader from './components/BillUploader'
import ExpenseDashboard from './components/ExpenseDashboard'

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanComplete = (data) => {
    // Add the new expense to the list (locally for now)
    setExpenses(prev => [{ ...data, id: Date.now() }, ...prev]);
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              ExpenseTracker<span className="text-blue-600">.ai</span>
            </h1>
          </div>
          <button className="text-sm font-medium text-slate-500 hover:text-slate-800">
            Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8">

        {/* Dashboard Section */}
        <div className="mb-8">
          <ExpenseDashboard expenses={expenses} />
        </div>

        {/* Actions */}
        <div className="mb-8">
          <BillUploader onScanComplete={handleScanComplete} />
        </div>

        {/* Recent Expenses List */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Recent Expenses</h3>

          <div className="space-y-3">
            {expenses.length === 0 ? (
              <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-slate-100 border-dashed">
                <p>No expenses yet. Scan a bill to get started!</p>
              </div>
            ) : (
              expenses.map((expense) => (
                <div key={expense.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{expense.merchant}</p>
                      <p className="text-xs text-slate-500">{expense.date}</p>
                    </div>
                  </div>
                  <div className="font-bold text-slate-800">
                    ${expense.total.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  )
}

export default App
