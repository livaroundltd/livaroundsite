import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0B1120",
  bgCard: "#111827",
  bgCard2: "#1E293B",
  teal: "#0EA5E9",
  tealDark: "#0284C7",
  mint: "#10B981",
  orange: "#F59E0B",
  coral: "#F43F5E",
  purple: "#8B5CF6",
  white: "#F8FAFC",
  light: "#CBD5E1",
  muted: "#64748B",
  border: "rgba(148,163,184,0.15)",
};

function Icon({ d, size = 20, color = COLORS.teal }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  check: "M20 6L9 17l-5-5",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M16 3.13a4 4 0 0 1 0 7.75",
  code: "M16 18l6-6-6-6 M8 6l-6 6 6 6",
  globe: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  zap: "M13 2L3 14h9l-1 10 10-12h-9l1-10z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  box: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  git: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  chart: "M18 20V10 M12 20V4 M6 20v-6",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  arrow: "M5 12h14 M12 5l7 7-7 7",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
};

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease` }}>
      {children}
    </div>
  );
}

function Badge({ children, color = COLORS.teal }) {
  return <span style={{ display: "inline-block", padding: "4px 12px", fontSize: 12, fontWeight: 600, borderRadius: 100, background: color + "18", color, letterSpacing: "0.5px" }}>{children}</span>;
}

function Section({ children, id }) {
  return <section id={id} style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>{children}</section>;
}

export default function LivAroundLanding() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ background: COLORS.bg, color: COLORS.white, fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: COLORS.bg + "ee", backdropFilter: "blur(12px)", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.mint})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={icons.home} size={18} color="#fff" />
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>LivAround</span>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center", fontSize: 14, color: COLORS.light }}>
            {["Features", "Pricing", "Open Source", "Partners"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = COLORS.teal} onMouseLeave={e => e.target.style.color = COLORS.light}>{l}</a>
            ))}
            <a href="https://github.com/mohiteu811-cloud/Livaround" target="_blank" rel="noopener" style={{ color: COLORS.light, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon d={icons.git} size={18} color={COLORS.light} /> GitHub
            </a>
            <a href="https://app.livaround.com" style={{ padding: "8px 20px", borderRadius: 8, background: COLORS.teal, color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: 13 }}>Get Started</a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.teal}15, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: -100, left: -200, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.purple}10, transparent 70%)` }} />

        <Section>
          <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto", paddingTop: 40 }}>
            <FadeIn>
              <Badge>Open Source &middot; AGPL Licensed</Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.08, margin: "24px 0 20px", letterSpacing: "-2px" }}>
                The operating system for<br />
                <span style={{ background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.mint})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  property operations
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize: 18, color: COLORS.light, lineHeight: 1.6, maxWidth: 580, margin: "0 auto 32px" }}>
                Manage properties, dispatch workers, track inventory, resolve issues, and report revenue — all from one platform. Self-host for free or use our managed cloud.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://app.livaround.com" style={{ padding: "14px 32px", borderRadius: 10, background: COLORS.teal, color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}>
                  Start free trial <Icon d={icons.arrow} size={16} color="#fff" />
                </a>
                <a href="https://github.com/mohiteu811-cloud/Livaround" style={{ padding: "14px 32px", borderRadius: 10, border: `1px solid ${COLORS.border}`, color: COLORS.light, textDecoration: "none", fontWeight: 500, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Icon d={icons.git} size={16} color={COLORS.light} /> View on GitHub
                </a>
              </div>
            </FadeIn>

            {/* Social proof */}
            <FadeIn delay={0.4}>
              <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
                {[
                  { val: "10", label: "Modules" },
                  { val: "30+", label: "Properties managed" },
                  { val: "$120/mo", label: "Starting price" },
                  { val: "100%", label: "AI-built" },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.teal }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Section>
      </div>

      {/* ═══ MODULES GRID ═══ */}
      <div id="features" style={{ background: COLORS.bgCard }}>
        <Section>
          <FadeIn><Badge color={COLORS.mint}>Platform</Badge></FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, margin: "16px 0 12px", letterSpacing: "-1px" }}>
              10 modules. One dashboard.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ color: COLORS.light, fontSize: 16, maxWidth: 500, marginBottom: 40 }}>
              Everything a property manager needs to run day-to-day operations, built into a single cohesive platform.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { icon: icons.home, title: "Properties", desc: "Profiles with amenities, WiFi codes, owner linkage, and staff assignments", color: COLORS.teal },
              { icon: icons.star, title: "Bookings", desc: "Multi-channel log from Airbnb, Booking.com, VRBO, and direct with guest stay links", color: COLORS.orange },
              { icon: icons.zap, title: "Jobs & Dispatch", desc: "Create jobs, attach checklists, dispatch to the best available worker instantly", color: COLORS.mint },
              { icon: icons.users, title: "Workers", desc: "Roster with skills, availability, property assignments, ratings, and the mobile app", color: COLORS.purple },
              { icon: icons.box, title: "Inventory", desc: "Per-property stock tracking with thresholds, low-stock alerts, and one-click restock", color: COLORS.teal },
              { icon: icons.wrench, title: "Issues & Maintenance", desc: "Workers report with photos and severity. You review, approve, and assign tradespeople", color: COLORS.coral },
              { icon: icons.chart, title: "Revenue Reports", desc: "Owner statements with gross/net breakdowns, CSV import, and commission tracking", color: COLORS.mint },
              { icon: icons.map, title: "Live GPS Tracking", desc: "Real-time worker locations on a map with 15-second updates and arrival confirmation", color: COLORS.orange },
              { icon: icons.shield, title: "Operations Guide", desc: "Per-property knowledge base with room-by-room docs and QR code labels", color: COLORS.purple },
              { icon: icons.phone, title: "Worker Mobile App", desc: "Android app with push notifications, checklists, issue reporting, and GPS sharing", color: COLORS.teal },
            ].map((m, i) => (
              <FadeIn key={m.title} delay={0.05 * i}>
                <div style={{ background: COLORS.bgCard2, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "24px 20px", height: "100%", transition: "border-color 0.3s, transform 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = m.color + "60"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: m.color + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon d={m.icon} size={20} color={m.color} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>{m.title}</h3>
                  <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.5, margin: 0 }}>{m.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      </div>

      {/* ═══ WHY OPEN SOURCE ═══ */}
      <Section id="open-source">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <FadeIn><Badge color={COLORS.purple}>Open Source</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, margin: "16px 0 16px", letterSpacing: "-1px" }}>
                Your data. Your server.<br />Your rules.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p style={{ color: COLORS.light, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                LivAround is released under the AGPL license. Self-host on your own infrastructure with full control, or use our managed cloud. No vendor lock-in, ever.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Full source code on GitHub — fork, modify, contribute",
                  "Community-driven roadmap with public feature voting",
                  "Plugin marketplace for integrations and add-ons",
                  "Self-hosting docs with Docker Compose setup",
                ].map(t => (
                  <div key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Icon d={icons.check} size={18} color={COLORS.mint} />
                    <span style={{ fontSize: 14, color: COLORS.light }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div style={{ background: COLORS.bgCard, borderRadius: 16, border: `1px solid ${COLORS.border}`, padding: 32, fontFamily: "'DM Mono', monospace" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} />
              </div>
              <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: COLORS.light, overflow: "auto" }}>
{`$ git clone github.com/mohiteu811-cloud/Livaround
$ cd Livaround
$ cp .env.example .env
$ docker compose up -d

✓ PostgreSQL ready
✓ Redis ready  
✓ LivAround running at localhost:3000

# You're live. Zero vendor lock-in.`}
              </pre>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ═══ COMPETITIVE COMPARISON ═══ */}
      <div style={{ background: COLORS.bgCard }}>
        <Section>
          <FadeIn><Badge color={COLORS.coral}>Comparison</Badge></FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, margin: "16px 0 12px", letterSpacing: "-1px" }}>
              What others miss, we cover.
            </h2>
            <p style={{ color: COLORS.muted, fontSize: 15, marginBottom: 32 }}>
              Guesty, Hostaway, and Lodgify handle bookings. LivAround handles everything else.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
                    {["Feature", "LivAround", "Guesty", "Hostaway", "Lodgify"].map((h, i) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: i === 0 ? "left" : "center", color: i === 1 ? COLORS.teal : COLORS.muted, fontWeight: 600, fontSize: 13 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Worker dispatch", true, false, false, false],
                    ["Inventory tracking", true, false, false, false],
                    ["Live GPS tracking", true, false, false, false],
                    ["Issue reporting", true, false, false, false],
                    ["Maintenance workflow", true, false, false, false],
                    ["Ops guide / QR codes", true, false, false, false],
                    ["Owner revenue reports", true, "partial", "partial", false],
                    ["Open source", true, false, false, false],
                    ["Channel management", "add-on", true, true, true],
                  ].map(([feat, ...vals], ri) => (
                    <tr key={feat} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 500 }}>{feat}</td>
                      {vals.map((v, ci) => (
                        <td key={ci} style={{ padding: "12px 16px", textAlign: "center" }}>
                          {v === true ? <span style={{ color: ci === 0 ? COLORS.mint : COLORS.muted }}>&#10003;</span>
                            : v === false ? <span style={{ color: COLORS.muted + "60" }}>&#10007;</span>
                              : <span style={{ color: COLORS.orange, fontSize: 12 }}>{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ background: COLORS.bgCard2 }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600 }}>Pricing (30 properties)</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: COLORS.teal, fontWeight: 700 }}>$120/mo</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: COLORS.muted }}>$480–810</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: COLORS.muted }}>$600–1,200</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: COLORS.muted }}>$500+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </Section>
      </div>

      {/* ═══ PRICING ═══ */}
      <Section id="pricing">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <FadeIn><Badge>Pricing</Badge></FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, margin: "16px 0 8px", letterSpacing: "-1px" }}>
              Simple, transparent pricing
            </h2>
            <p style={{ color: COLORS.muted, fontSize: 15 }}>Self-host for free, or let us handle infrastructure.</p>
          </FadeIn>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {[
            { name: "Community", price: "Free", period: "forever", desc: "Self-hosted", features: ["All 10 modules", "Worker mobile app", "REST API access", "Community support", "Unlimited properties"], color: COLORS.muted, highlight: false },
            { name: "Pro", price: "$120", period: "/month", desc: "Managed cloud", features: ["Everything in Community", "Managed hosting & backups", "Email support", "Basic integrations", "Up to 50 properties"], color: COLORS.teal, highlight: true },
            { name: "Agency", price: "$350", period: "/month", desc: "For PM companies", features: ["Everything in Pro", "White-label branding", "Channel sync (Airbnb etc.)", "Multi-organization", "Unlimited properties"], color: COLORS.orange, highlight: false },
            { name: "Enterprise", price: "Custom", period: "", desc: "Tailored solution", features: ["Everything in Agency", "SLA & dedicated support", "Custom integrations", "On-premise option", "Training & onboarding"], color: COLORS.purple, highlight: false },
          ].map((tier, i) => (
            <FadeIn key={tier.name} delay={0.1 * i}>
              <div style={{
                background: COLORS.bgCard, borderRadius: 16, padding: "32px 24px", height: "100%",
                border: tier.highlight ? `2px solid ${COLORS.teal}` : `1px solid ${COLORS.border}`,
                position: "relative",
              }}>
                {tier.highlight && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: COLORS.teal, color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 14px", borderRadius: 100 }}>
                    Most popular
                  </div>
                )}
                <div style={{ fontSize: 13, color: tier.color, fontWeight: 600, marginBottom: 4 }}>{tier.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 700 }}>{tier.price}</span>
                  <span style={{ fontSize: 14, color: COLORS.muted }}>{tier.period}</span>
                </div>
                <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 24 }}>{tier.desc}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {tier.features.map(f => (
                    <div key={f} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <Icon d={icons.check} size={14} color={COLORS.mint} />
                      <span style={{ fontSize: 13, color: COLORS.light }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="https://app.livaround.com" style={{
                  display: "block", marginTop: 24, padding: "12px 0", borderRadius: 10, textAlign: "center", textDecoration: "none", fontWeight: 600, fontSize: 14,
                  background: tier.highlight ? COLORS.teal : "transparent",
                  color: tier.highlight ? "#fff" : COLORS.light,
                  border: tier.highlight ? "none" : `1px solid ${COLORS.border}`,
                }}>
                  {tier.price === "Custom" ? "Contact us" : "Get started"}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ═══ PARTNER PROGRAM ═══ */}
      <div id="partners" style={{ background: COLORS.bgCard }}>
        <Section>
          <FadeIn><Badge color={COLORS.orange}>Earn with us</Badge></FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, margin: "16px 0 12px", letterSpacing: "-1px" }}>
              Partner program — earn 25% recurring
            </h2>
            <p style={{ color: COLORS.light, fontSize: 15, maxWidth: 600, marginBottom: 40, lineHeight: 1.7 }}>
              Property management is relationship-driven. Earn recurring commissions by referring hosts, or become a certified channel partner with white-label rights.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { tier: "Referral Partner", commission: "15–20%", desc: "Any paying customer. Share your link, earn recurring commission for every referral that converts.", who: "Hosts, property managers", color: COLORS.teal },
              { tier: "Channel Partner", commission: "25–30%", desc: "Certified local agencies. Direct commission plus 5–10% override on your referrals' referrals.", who: "PM consultants, hospitality agencies", color: COLORS.orange },
              { tier: "Strategic Partner", commission: "5% network", desc: "Regional distributors with exclusive territory rights and dedicated account management.", who: "Large PM companies, hospitality networks", color: COLORS.purple },
            ].map((p, i) => (
              <FadeIn key={p.tier} delay={0.1 * i}>
                <div style={{ background: COLORS.bgCard2, borderRadius: 14, padding: "28px 24px", borderLeft: `3px solid ${p.color}` }}>
                  <div style={{ fontSize: 13, color: p.color, fontWeight: 600, marginBottom: 8 }}>{p.tier}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{p.commission}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 12 }}>recurring commission</div>
                  <p style={{ fontSize: 13, color: COLORS.light, lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>For: {p.who}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      </div>

      {/* ═══ CTA ═══ */}
      <Section>
        <FadeIn>
          <div style={{ textAlign: "center", padding: "60px 40px", borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.teal}12, ${COLORS.purple}12)`, border: `1px solid ${COLORS.border}` }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, margin: "0 0 12px", letterSpacing: "-1px" }}>
              Ready to simplify your operations?
            </h2>
            <p style={{ color: COLORS.light, fontSize: 16, maxWidth: 480, margin: "0 auto 28px" }}>
              Join property managers running 30+ properties on LivAround. Start free, upgrade when you're ready.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://app.livaround.com" style={{ padding: "14px 32px", borderRadius: 10, background: COLORS.teal, color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: 15 }}>
                Start free trial
              </a>
              <a href="https://github.com/mohiteu811-cloud/Livaround" style={{ padding: "14px 32px", borderRadius: 10, border: `1px solid ${COLORS.border}`, color: COLORS.light, textDecoration: "none", fontWeight: 500, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Icon d={icons.git} size={16} color={COLORS.light} /> Star on GitHub
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.mint})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon d={icons.home} size={14} color="#fff" />
              </div>
              <span style={{ fontWeight: 700 }}>LivAround</span>
            </div>
            <p style={{ fontSize: 13, color: COLORS.muted, maxWidth: 260 }}>Open-source property operations platform. Built with AI, powered by community.</p>
          </div>
          <div style={{ display: "flex", gap: 48, fontSize: 13, color: COLORS.muted }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontWeight: 600, color: COLORS.light, marginBottom: 4 }}>Product</span>
              <span>Features</span><span>Pricing</span><span>Self-hosting</span><span>API Docs</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontWeight: 600, color: COLORS.light, marginBottom: 4 }}>Community</span>
              <span>GitHub</span><span>Discord</span><span>Blog</span><span>Changelog</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontWeight: 600, color: COLORS.light, marginBottom: 4 }}>Company</span>
              <span>About</span><span>Partners</span><span>Contact</span><span>Privacy</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "32px auto 0", paddingTop: 24, borderTop: `1px solid ${COLORS.border}`, fontSize: 12, color: COLORS.muted, textAlign: "center" }}>
          &copy; 2026 LivAround. Open source under AGPL-3.0 license.
        </div>
      </footer>
    </div>
  );
}
