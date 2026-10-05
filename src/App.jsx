import React, { useState } from 'react';
import { Dumbbell, Apple, Calendar, ShoppingCart, Scale, Flame, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [weight, setWeight] = useState(72);
  const [weightLogs, setWeightLogs] = useState([
    { date: 'Mon', weight: 72.5 },
    { date: 'Wed', weight: 72.2 },
    { date: 'Today', weight: 72.0 }
  ]);
  const [newEntry, setNewEntry] = useState('');

  const logWeight = (e) => {
    e.preventDefault();
    if (!newEntry) return;
    const val = parseFloat(newEntry);
    setWeight(val);
    setWeightLogs([...weightLogs, { date: 'Today', weight: val }]);
    setNewEntry('');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px', color: '#1f2937' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Dumbbell size={28} color="#2563eb" />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>FitLife Coach</h1>
        </div>
        <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold' }}>
          Current: {weight} kg
        </span>
      </header>

      {/* Navigation Tabs */}
      <nav style={{ display: 'flex', gap: '8px', margin: '20px 0' }}>
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Flame },
          { id: 'workouts', label: 'Workouts', icon: Dumbbell },
          { id: 'meals', label: 'Meal Plan', icon: Apple },
          { id: 'shopping', label: 'Shopping List', icon: ShoppingCart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: isActive ? '#2563eb' : '#f3f4f6',
                color: isActive ? '#fff' : '#4b5563',
                fontWeight: '600'
              }}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Content Area */}
      <main style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '18px', marginTop: 0 }}>Track Your Weight Progress</h2>
            <form onSubmit={logWeight} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <input
                type="number"
                step="0.1"
                placeholder="Enter weight (kg)"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', flex: 1 }}
              />
              <button type="submit" style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                Log Weight
              </button>
            </form>

            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Recent Logs</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {weightLogs.map((log, i) => (
                <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span>{log.date}</span>
                  <strong>{log.weight} kg</strong>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'workouts' && (
          <div>
            <h2 style={{ fontSize: '18px', marginTop: 0 }}>Today's Workout Plan</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Push-ups / Bench Press', reps: '3 sets x 12 reps', alt: 'No equipment: Incline Push-ups' },
                { name: 'Bodyweight Squats / Barbell Squats', reps: '4 sets x 10 reps', alt: 'No equipment: Jump Squats' },
                { name: 'Plank Hold', reps: '3 sets x 45 secs', alt: 'No equipment: Core hold' }
              ].map((ex, i) => (
                <div key={i} style={{ padding: '12px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={18} color="#10b981" />
                    <strong>{ex.name}</strong>
                  </div>
                  <p style={{ margin: '4px 0 0 26px', fontSize: '14px', color: '#6b7280' }}>{ex.reps} • <em>Alt: {ex.alt}</em></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'meals' && (
          <div>
            <h2 style={{ fontSize: '18px', marginTop: 0 }}>Weekly Meal Plan</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}><strong>Breakfast:</strong> Oatmeal with chia seeds & berries</li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}><strong>Lunch:</strong> Grilled chicken or tofu salad with quinoa</li>
              <li style={{ padding: '8px 0' }}><strong>Dinner:</strong> Baked salmon with sweet potato & broccoli</li>
            </ul>
          </div>
        )}

        {activeTab === 'shopping' && (
          <div>
            <h2 style={{ fontSize: '18px', marginTop: 0 }}>Automated Shopping List</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Rolled Oats', 'Chia Seeds', 'Chicken Breast / Tofu', 'Quinoa', 'Salmon Fillets', 'Broccoli'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0' }}>
                  <input type="checkbox" id={`item-${i}`} />
                  <label htmlFor={`item-${i}`}>{item}</label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}