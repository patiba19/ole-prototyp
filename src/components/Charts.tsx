
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

import type { Question, Submission } from '../types';

export function summarize(
  questions: Question[],
  submissions: Submission[]
) {
  return questions
    .filter((q) => q.kind === 'rating')
    .map((q, index) => {
      const values = submissions
        .map((s) => Number(s.answers[q.id]))
        .filter((x) => x >= 1 && x <= 5);

      return {
        id: q.id,
        name: `F${index + 1}`,
        full: q.text,
        avg: values.length
          ? Number(
              (
                values.reduce((a, b) => a + b, 0) /
                values.length
              ).toFixed(2)
            )
          : 0,
        count: values.length,
      };
    });
}

export function ResultCharts({
  questions,
  submissions,
}: {
  questions: Question[];
  submissions: Submission[];
}) {
  const stats = summarize(questions, submissions);

  const valid = stats.filter((x) => x.count > 0);

  const overall = valid.length
    ? (
        valid.reduce((sum, x) => sum + x.avg, 0) /
        valid.length
      ).toFixed(1)
    : '–';

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-blue-50 p-4">
          <div className="text-xs font-semibold text-brand-blue">
            Teilnahmen
          </div>
          <div className="mt-1 text-3xl font-extrabold text-brand-navy">
            {submissions.length}
          </div>
        </div>

        <div className="rounded-xl bg-lime-50 p-4">
          <div className="text-xs font-semibold text-lime-700">
            Ø Bewertung
          </div>
          <div className="mt-1 text-3xl font-extrabold text-brand-navy">
            {overall}
            <span className="text-base font-normal text-slate-400">
              {' '} / 5
            </span>
          </div>
        </div>

        <div className="col-span-2 rounded-xl bg-cyan-50 p-4 sm:col-span-1">
          <div className="text-xs font-semibold text-cyan-700">
            Skalenfragen
          </div>
          <div className="mt-1 text-3xl font-extrabold text-brand-navy">
            {stats.length}
          </div>
        </div>
      </div>

      {valid.length ? (
        <>
          <div
            className="h-64 w-full"
            role="img"
            aria-label="Balkendiagramm der durchschnittlichen Bewertungen je Frage von eins bis fünf"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={valid}
                margin={{
                  top: 8,
                  right: 16,
                  left: -20,
                  bottom: 8,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E8EEF3"
                />

                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  formatter={(val, name) => [
                    `${val} von 5`,
                    name === 'avg'
                      ? 'Durchschnitt'
                      : String(name),
                  ]}
                  labelFormatter={(label) =>
                    valid.find(
                      (item) => item.name === String(label)
                    )?.full ?? String(label)
                  }
                />

                <Bar
                  dataKey="avg"
                  radius={[7, 7, 0, 0]}
                  maxBarSize={55}
                >
                  {valid.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        i % 2 === 0
                          ? '#0064A6'
                          : '#42B9D0'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {stats.map((item, i) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 border-b border-slate-100 py-2 text-sm"
              >
                <span>
                  <span className="mr-2 font-semibold text-brand-blue">
                    F{i + 1}
                  </span>
                  {item.full}
                </span>

                <strong className="shrink-0 text-brand-navy">
                  {item.count
                    ? `${item.avg.toFixed(2)} / 5`
                    : '–'}
                </strong>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="muted">
          Noch keine auswertbaren Skalenantworten vorhanden.
        </p>
      )}
    </div>
  );
}
