import { useEffect, useState } from 'react'

type IconName =
  | 'arrow'
  | 'calendar'
  | 'check'
  | 'heart'
  | 'leaf'
  | 'location'
  | 'menu'
  | 'phone'
  | 'search'
  | 'shield'
  | 'users'
  | 'x'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z" />,
    leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 4.8 20 5 20 5s.2 4.5-1.1 10.2A7 7 0 0 1 11 20Z" /><path d="M4 21c3.5-5.5 7-8.5 12-11" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c1 .3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const clinics = [
  { title: '통증·척추 클리닉', desc: '허리, 목, 어깨, 무릎 통증', image: '/images/clinic-spine.jpg', detail: '근육과 관절의 균형을 살피고 추나요법, 침구치료, 한약 처방을 환자 상태에 맞게 조합합니다.' },
  { title: '소화기 클리닉', desc: '소화불량, 위장장애, 역류', image: '/images/clinic-digestion.jpg', detail: '몸 전체의 순환과 소화기 기능을 함께 살펴 반복되는 불편함의 원인을 세심하게 관리합니다.' },
  { title: '교통사고 후유증', desc: '사고 후 통증, 재활 치료', image: '/images/clinic-rehab.jpg', detail: '사고 직후 드러나지 않는 통증까지 단계별로 확인하고 회복 과정에 맞춘 통합 치료를 진행합니다.' },
  { title: '여성건강 클리닉', desc: '생리통, 갱년기, 여성질환', image: '/images/clinic-women.jpg', detail: '여성의 생애 주기와 체질을 고려한 편안하고 섬세한 진료로 일상의 건강을 돕습니다.' },
  { title: '소아·성장 클리닉', desc: '성장, 면역, 체질 개선', image: '/images/clinic-family.jpg', detail: '아이의 성장 속도와 생활 습관을 함께 살펴 건강한 성장 기반을 만들어갑니다.' },
]

const strengths = [
  ['leaf', '맞춤 한방치료', '개인별 체질과 상태에 맞춘 1:1 치료'],
  ['check', '안전한 한약 처방', '믿을 수 있는 청정 한약재 사용'],
  ['heart', '환자 중심 진료', '충분히 듣고 이해하는 세심한 진료'],
  ['users', '풍부한 임상 경험', '분야별 의료진의 협진 시스템'],
  ['shield', '통합 회복 관리', '치료부터 일상 복귀까지 함께'],
] as const

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [selectedClinic, setSelectedClinic] = useState<(typeof clinics)[number] | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = reservationOpen || selectedClinic || lightbox || noticeOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [reservationOpen, selectedClinic, lightbox, noticeOpen])

  const closeMenu = () => setMenuOpen(false)
  const openReservation = () => {
    setSubmitted(false)
    setReservationOpen(true)
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="다온한방병원 홈">
            <span className="brand-mark"><Icon name="leaf" size={29} /></span>
            <span><strong>다온한방병원</strong><small>DAON KOREAN MEDICINE HOSPITAL</small></span>
          </a>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="주요 메뉴">
            <a href="#about" onClick={closeMenu}>병원소개</a>
            <a href="#clinics" onClick={closeMenu}>진료안내</a>
            <a href="#care" onClick={closeMenu}>치료클리닉</a>
            <a href="#space" onClick={closeMenu}>병원공간</a>
            <a href="#contact" onClick={closeMenu}>커뮤니티</a>
            <div className="mobile-actions">
              <a href="tel:0551234567" className="btn btn-outline">전화 상담</a>
              <button className="btn btn-primary" onClick={openReservation}>예약하기</button>
            </div>
          </nav>
          <div className="header-actions">
            <a href="#clinics" className="icon-button" aria-label="진료 분야 검색"><Icon name="search" /></a>
            <a href="tel:0551234567" className="btn btn-outline">온라인 상담</a>
            <button className="btn btn-primary" onClick={openReservation}>예약하기</button>
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기" aria-expanded={menuOpen}>
            <Icon name={menuOpen ? 'x' : 'menu'} size={25} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="hero-copy-inner">
              <p className="eyebrow">몸과 마음이 다시, 편안해지는 곳</p>
              <h1>일상의 건강을<br /><em>되찾는 한방의 힘</em></h1>
              <p className="hero-description">사람을 먼저 생각하는 다온한방병원이<br />건강한 하루를 함께 만들어갑니다.</p>
              <div className="button-row">
                <button className="btn btn-primary btn-large" onClick={openReservation}>진료 예약하기 <Icon name="arrow" /></button>
                <a className="btn btn-light btn-large" href="#about">병원 소개 보기</a>
              </div>
              <div className="hero-meta"><strong>01</strong><span /><small>몸과 마음을 잇는 진료</small></div>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero-clinic.jpg" alt="따뜻한 햇살이 드는 다온한방병원 대기 공간" />
            <div className="hero-image-badge">
              <span className="brand-mark"><Icon name="leaf" size={32} /></span>
              <strong>건강한 오늘,<br />더 나은 내일</strong>
            </div>
          </div>
        </section>

        <section className="strengths" aria-label="다온의 진료 원칙">
          <div className="container strengths-grid">
            {strengths.map(([icon, title, desc]) => (
              <article className="strength-item" key={title}>
                <Icon name={icon} size={31} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="about-image">
            <img src="/images/herbal-tea.jpg" alt="정성스럽게 준비한 한약재와 차" />
            <span className="image-label">Nature · Balance · Recovery</span>
          </div>
          <div className="about-copy">
            <p className="section-kicker"><span /> 전통의 지혜, 오늘의 건강으로</p>
            <h2 className="section-title">사람을 위한<br />올바른 한방치료</h2>
            <p>다온한방병원은 전통의 가치를 바탕으로 현대인의 건강 고민을 함께 해결합니다. 증상만 보지 않고 생활과 마음까지 살피는 진료를 약속합니다.</p>
            <div className="value-grid">
              <div><Icon name="heart" /><strong>환자 중심 진료</strong></div>
              <div><Icon name="shield" /><strong>안전한 의료 시스템</strong></div>
              <div><Icon name="users" /><strong>분야별 협진</strong></div>
            </div>
            <a href="#clinics" className="text-link">다온의 진료 철학 더 보기 <Icon name="arrow" /></a>
          </div>
        </section>

        <section className="clinics section" id="clinics">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-kicker">SPECIALIZED CARE</p><h2 className="section-title">주요 진료 클리닉</h2></div>
              <p>다양한 한방 진료로<br />일상의 건강을 지켜드립니다.</p>
            </div>
            <div className="clinic-grid">
              {clinics.map((clinic, index) => (
                <button className="clinic-card" key={clinic.title} onClick={() => setSelectedClinic(clinic)}>
                  <span className="clinic-image"><img src={clinic.image} alt="" /><span>0{index + 1}</span></span>
                  <span className="clinic-info"><strong>{clinic.title}</strong><small>{clinic.desc}</small><i><Icon name="arrow" /></i></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="care section" id="care">
          <div className="container care-inner">
            <div className="care-copy">
              <p className="section-kicker light">DAON CARE PROGRAM</p>
              <h2>진단부터 회복까지,<br />한 사람을 위한 치료</h2>
              <p>충분한 상담과 체계적인 진단을 통해<br />내 몸에 꼭 맞는 회복 계획을 세웁니다.</p>
              <button className="btn btn-cream" onClick={openReservation}>나에게 맞는 진료 상담 <Icon name="arrow" /></button>
            </div>
            <ol className="care-steps">
              <li><span>01</span><div><strong>정밀 상담</strong><small>현재 증상과 생활 습관을 충분히 듣습니다.</small></div></li>
              <li><span>02</span><div><strong>개인별 진단</strong><small>체질과 몸의 균형을 세심하게 살핍니다.</small></div></li>
              <li><span>03</span><div><strong>통합 치료</strong><small>침, 약침, 추나, 한약을 맞춤 적용합니다.</small></div></li>
              <li><span>04</span><div><strong>회복 관리</strong><small>건강한 일상 복귀까지 함께합니다.</small></div></li>
            </ol>
          </div>
        </section>

        <section className="space section" id="space">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-kicker">HEALING SPACE</p><h2 className="section-title">편안함이 머무는 공간</h2></div>
              <p>몸과 마음이 모두 편안할 수 있도록<br />쾌적한 진료 환경을 준비했습니다.</p>
            </div>
            <div className="space-gallery">
              <button className="space-main" onClick={() => setLightbox('/images/space-room.jpg')}>
                <img src="/images/space-room.jpg" alt="차분한 베이지 톤의 1인 치료실" />
                <span><small>PRIVATE CARE</small><strong>1인 치료실</strong><i>+</i></span>
              </button>
              <button onClick={() => setLightbox('/images/space-lounge.jpg')}>
                <img src="/images/space-lounge.jpg" alt="햇살이 드는 편안한 대기 공간" />
                <span><small>WELCOME LOUNGE</small><strong>대기 공간</strong><i>+</i></span>
              </button>
              <div className="space-note">
                <span className="brand-mark"><Icon name="leaf" size={30} /></span>
                <p>머무는 시간까지<br /><strong>회복의 일부가 되도록</strong></p>
              </div>
            </div>
          </div>
        </section>

        <section className="information" id="contact">
          <div className="container information-grid">
            <article className="notices">
              <div className="info-title"><h3>공지사항</h3><button onClick={() => setNoticeOpen(true)}>더보기 +</button></div>
              <button onClick={() => setNoticeOpen(true)}><span>추석 연휴 진료 일정 안내</span><time>2025.09.10</time></button>
              <button onClick={() => setNoticeOpen(true)}><span>독감 예방 한약 프로그램 안내</span><time>2025.09.05</time></button>
              <button onClick={() => setNoticeOpen(true)}><span>진료 예약 시스템 오픈 안내</span><time>2025.08.28</time></button>
            </article>
            <article className="review">
              <p className="section-kicker">PATIENT STORY</p>
              <h3>환자분들의 이야기</h3>
              <blockquote>“꼼꼼한 설명과 편안한 진료 덕분에 오래된 허리 불편함이 많이 좋아졌어요.”</blockquote>
              <small>김○○ 님 · 통증 클리닉</small>
            </article>
            <article className="location-card">
              <p className="section-kicker light">LOCATION</p>
              <h3>오시는 길</h3>
              <div className="map-visual"><span><Icon name="location" size={30} /></span><b>DAON</b></div>
              <p><Icon name="location" /> 경상남도 진주시 진주대로 123</p>
              <a href="https://map.kakao.com/?q=경상남도%20진주시%20진주대로%20123" target="_blank" rel="noreferrer">지도에서 보기 <Icon name="arrow" /></a>
            </article>
            <article className="contact-card">
              <p className="section-kicker light">RESERVATION</p>
              <h3>진료 예약 및 상담</h3>
              <a className="phone-number" href="tel:0551234567"><Icon name="phone" size={25} /> 055-123-4567</a>
              <dl><dt>평일</dt><dd>09:00 – 18:00</dd><dt>토요일</dt><dd>09:00 – 13:00</dd><dt>점심시간</dt><dd>12:30 – 13:30</dd></dl>
              <button className="btn btn-cream" onClick={openReservation}>진료 예약하기 <Icon name="arrow" /></button>
            </article>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="brand footer-brand"><span className="brand-mark"><Icon name="leaf" size={26} /></span><span><strong>다온한방병원</strong><small>DAON KOREAN MEDICINE HOSPITAL</small></span></div>
          <p>대표자 홍길동 · 사업자등록번호 123-45-67890<br />경상남도 진주시 진주대로 123 · 대표전화 055-123-4567</p>
          <div><a href="#privacy">개인정보처리방침</a><span>© 2025 DAON HOSPITAL.</span></div>
        </div>
      </footer>

      {showTop && <button className="top-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="페이지 상단으로">↑</button>}

      {reservationOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="reservation-title" onMouseDown={(e) => e.target === e.currentTarget && setReservationOpen(false)}>
          <div className="modal reservation-modal">
            <button className="modal-close" onClick={() => setReservationOpen(false)} aria-label="닫기"><Icon name="x" /></button>
            {submitted ? (
              <div className="success-message"><span><Icon name="check" size={32} /></span><h2>예약 신청이 접수되었습니다</h2><p>확인 후 입력하신 연락처로 안내드리겠습니다.</p><button className="btn btn-primary" onClick={() => setReservationOpen(false)}>확인</button></div>
            ) : (
              <>
                <p className="section-kicker">RESERVATION</p>
                <h2 id="reservation-title">진료 예약 신청</h2>
                <p className="modal-intro">간단한 정보를 남겨주시면 전문 상담원이 연락드리겠습니다.</p>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                  <label>성함<input type="text" name="name" placeholder="성함을 입력해주세요" required /></label>
                  <label>연락처<input type="tel" name="phone" placeholder="010-0000-0000" required /></label>
                  <label>진료 분야<select name="clinic" required defaultValue=""><option value="" disabled>진료 분야를 선택해주세요</option>{clinics.map(c => <option key={c.title}>{c.title}</option>)}</select></label>
                  <label>희망 날짜<input type="date" name="date" required /></label>
                  <label className="form-agree"><input type="checkbox" required /> 개인정보 수집 및 이용에 동의합니다.</label>
                  <button className="btn btn-primary btn-submit" type="submit">예약 신청하기 <Icon name="arrow" /></button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {selectedClinic && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" onMouseDown={(e) => e.target === e.currentTarget && setSelectedClinic(null)}>
          <div className="modal clinic-modal">
            <button className="modal-close" onClick={() => setSelectedClinic(null)} aria-label="닫기"><Icon name="x" /></button>
            <img src={selectedClinic.image} alt="" />
            <div><p className="section-kicker">DAON SPECIAL CLINIC</p><h2>{selectedClinic.title}</h2><p>{selectedClinic.detail}</p>
              <ul><li><Icon name="check" /> 충분한 상담과 체질 진단</li><li><Icon name="check" /> 개인별 단계 치료 계획</li><li><Icon name="check" /> 치료 후 생활 관리 안내</li></ul>
              <button className="btn btn-primary" onClick={() => { setSelectedClinic(null); openReservation() }}>이 진료 예약하기 <Icon name="arrow" /></button>
            </div>
          </div>
        </div>
      )}

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><button aria-label="닫기"><Icon name="x" size={28} /></button><img src={lightbox} alt="다온한방병원 공간 확대 이미지" /></div>}
      {noticeOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" onMouseDown={(e) => e.target === e.currentTarget && setNoticeOpen(false)}><div className="modal notice-modal"><button className="modal-close" onClick={() => setNoticeOpen(false)}><Icon name="x" /></button><p className="section-kicker">NOTICE</p><h2>추석 연휴 진료 일정 안내</h2><time>2025.09.10</time><p>다온한방병원을 찾아주시는 환자분들께 감사드립니다. 추석 연휴 기간 중 10월 5일부터 7일까지 휴진하며, 10월 8일부터 정상 진료합니다.</p><button className="btn btn-primary" onClick={() => setNoticeOpen(false)}>확인</button></div></div>}
    </div>
  )
}

export default App
