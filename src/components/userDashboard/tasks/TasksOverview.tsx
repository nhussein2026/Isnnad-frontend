/** ------- Types ------- */
type HexColor = `#${string}`;

export type StatValue = number;
export type StatLabel = string;
export type StatColor = HexColor;

// دائرة التقدم
type CircleProgressProps = {
  value: StatValue;
  color: StatColor;
  size?: number;
  stroke?: number;
  track?: HexColor | string;
};

// بطاقة الإحصائية
type StatCardProps = {
  value: StatValue;
  label: StatLabel;
  color: StatColor;
};

/** ------- Visual Helpers ------- */
function CircleProgress({
  value,
  color,
  size = 120,
  stroke = 10,
  track = '#E5E7EB',
}: CircleProgressProps) {
  const r = size / 2 - stroke;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * c;
  const gap = c - dash;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="block"
      aria-label={`progress ${clamped}%`}
      role="img"
    >
      {/* المسار الرمادي الخلفي */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={track}
        strokeWidth={stroke}
        fill="none"
      />
      {/* مسار التقدم يبدأ من الأعلى */}
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="butt"
          fill="none"
          strokeDasharray={`${dash} ${gap}`}
        />
      </g>
    </svg>
  );
}

function StatCard({ value, label, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-[14px] border border-black/5 shadow-[0_18px_24px_rgba(0,0,0,0.12),0_3px_8px_rgba(0,0,0,0.06)] p-6 flex flex-col items-center justify-center">
      <div className="relative">
        <CircleProgress value={value} color={color} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[22px] leading-none font-bold text-gray-900">
            {value}
          </div>
          <div className="text-[11px] mt-1 text-gray-400">مهمة</div>
        </div>
      </div>
      <div className="mt-4 text-[15px] font-extrabold text-gray-800">
        {label}
      </div>
    </div>
  );
}

/** ------- Section ------- */
export default function TasksOverview() {
  return (
    <section dir="rtl" className="w-full mb-15">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* الأزرق: مستبعدة */}
        <StatCard value={5} label="مستبعدة" color="#1E88E5" />
        {/* الأخضر: المكتملة */}
        <StatCard value={65} label="المكتملة" color="#0F8A5F" />
        {/* الخمري: قيد الإنجاز */}
        <StatCard value={30} label="قيد الإنجاز" color="#8B1D3B" />
      </div>
    </section>
  );
}
