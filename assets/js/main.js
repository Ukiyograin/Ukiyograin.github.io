(function(){
    const STORAGE_THEME_KEY = 'Serendisand_theme';
    const STORAGE_LANG_KEY = 'Serendisand_lang';
    const STORAGE_MUSIC_VISIBLE_KEY = 'Serendisand_music_visible';
    const { githubUsername: GITHUB_USERNAME, playlistIds, texts: TEXTS, themes: THEMES } = window.SITE_CONFIG;

    let reposData = [], currentIndex = 0, itemsPerView = 3, autoPlayInterval = null, isHovering = false, galleryImages = [], currentLang = 'zh', currentTheme = 'sand-gold', marqueeAnimationId = null, marqueePosition = 0, marqueeSpeed = 0.8, isMarqueeHovering = false, marqueeTotalWidth = 0, marqueeContainerWidth = 0;
    let musicIframeVisible = true;
    let musicInitialized = false;
    let pendingPlaylistId = null;
    let currentUserData = null;

    const musicIframeContainer = document.getElementById('musicIframeContainer');
    const musicIframe = document.getElementById('musicIframe');
    const musicBtn = document.getElementById('musicBtn');
    const musicDisc = document.getElementById('musicDisc');

    const lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
function escapeHtml(s) {
    return s ? String(s).replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[m]) : '';
}
    function truncateUrl(url) { return url.length > 30 ? url.substring(0,27)+'...' : url; }
    function openLightbox(src) { lightboxImg.src = src; lightbox.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeLightbox() { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
    if(lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    if(lightbox) lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox(); });

    const dom = { profileContainer: document.getElementById('github-profile-container'), reposSection: document.getElementById('repos-carousel-section'), carouselTrack: document.getElementById('repoCarouselTrack'), repoPrevBtn: document.getElementById('repoPrevBtn'), repoNextBtn: document.getElementById('repoNextBtn'), repoDots: document.getElementById('repoDots'), repoCountBadge: document.getElementById('repo-count-badge'), marqueeSection: document.getElementById('marquee-section'), marqueeTrack: document.getElementById('marqueeTrack'), snakeContainer: document.getElementById('snake-container'), langSwitchBtn: document.getElementById('langSwitchBtn'), langText: document.getElementById('langText'), loadingPlaceholder: document.getElementById('loading-placeholder'), loadingMsg: document.getElementById('loadingMsg'), reposTitle: document.getElementById('reposTitle'), galleryTitle: document.getElementById('galleryTitle'), footerText: document.getElementById('footerText'), footerSub: document.getElementById('footerSub'), siteTitle: document.getElementById('siteTitle'), siteTagline: document.getElementById('siteTagline') };

    function getRandomPlaylistId() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        return playlistIds[dayOfYear % playlistIds.length];
    }

    function loadMusicIframe() {
        if (musicInitialized) return;
        musicInitialized = true;
        const playlistId = pendingPlaylistId || getRandomPlaylistId();
        musicIframe.src = `//music.163.com/outchain/player?type=0&id=${playlistId}&auto=1&height=66`;
        musicBtn.classList.add('playing');
    }

function initMusicPlayer() {
    pendingPlaylistId = getRandomPlaylistId();

    function loadMusicOnInteraction() {
        if (musicInitialized) {
            document.removeEventListener('click', loadMusicOnInteraction);
            document.removeEventListener('touchstart', loadMusicOnInteraction);
            document.removeEventListener('keydown', loadMusicOnInteraction);
            return;
        }

        if (!musicIframeVisible) return;

        loadMusicIframe();
        document.removeEventListener('click', loadMusicOnInteraction);
        document.removeEventListener('touchstart', loadMusicOnInteraction);
        document.removeEventListener('keydown', loadMusicOnInteraction);
    }

    document.addEventListener('click', loadMusicOnInteraction);
    document.addEventListener('touchstart', loadMusicOnInteraction);
    document.addEventListener('keydown', loadMusicOnInteraction);
}

function toggleMusicIframe() {
    musicIframeVisible = !musicIframeVisible;

    if (musicIframeVisible) {
        musicIframeContainer.classList.add('show');

        if (!musicInitialized) {
            loadMusicIframe();
        }

        musicBtn.classList.add('playing');
        localStorage.setItem(STORAGE_MUSIC_VISIBLE_KEY, 'visible');
    } else {
        musicIframeContainer.classList.remove('show');
        musicBtn.classList.remove('playing');

        musicIframe.src = '';
        musicInitialized = false;

        localStorage.setItem(STORAGE_MUSIC_VISIBLE_KEY, 'hidden');
    }
}

    function updateMusicButtonTheme() {
        const t = THEMES[currentTheme];
        musicDisc.style.backgroundColor = t.vinylBg;
        musicDisc.style.color = t.vinylIcon;
        musicDisc.style.boxShadow = `0 0 0 2px ${t.borderLight}, 0 4px 12px rgba(0,0,0,0.1)`;
    }

    function animateNameSwap() {
        const container = document.querySelector('.name-wrapper');
        if (!container) return;
        const parts = container.querySelectorAll('.name-part');
        if (parts.length !== 2) return;
        parts[0].classList.add('swap-left');
        parts[1].classList.add('swap-right');
        setTimeout(() => {
            const firstText = parts[0].textContent;
            const secondText = parts[1].textContent;
            parts[0].textContent = secondText;
            parts[1].textContent = firstText;
            parts[0].classList.remove('swap-left');
            parts[1].classList.remove('swap-right');
        }, 400);
    }

    function loadSnakeSvg() { const t = THEMES[currentTheme]; fetch(t.isLight ? 'svg/snake-Light.svg' : 'svg/snake-Dark.svg').then(res=>res.ok?res.text():Promise.reject()).then(svg=>{ dom.snakeContainer.innerHTML = svg; const svgEl = dom.snakeContainer.querySelector('svg'); if(svgEl){ svgEl.style.width='100%'; svgEl.style.height='auto'; svgEl.style.display='block'; svgEl.style.borderRadius='24px'; } }).catch(()=>{ dom.snakeContainer.innerHTML='<div style="padding:1rem;text-align:center;border:1px dashed;border-radius:24px;"><i class="fas fa-gamepad"></i> 🐍 snake svg missing</div>'; }); }

		function buildRingPanel() {
			const container = document.getElementById('ringContainer');
			if (!container) return;

			const themes = Object.keys(THEMES);
			const count = themes.length;
			const angleStep = 360 / count;

			container.innerHTML = '';

			themes.forEach((themeKey, idx) => {
				const angle = idx * angleStep;
				const startAngle = angle - 72;
				const labelTilt = 0;
				const theme = THEMES[themeKey];
				const themeName = TEXTS[currentLang].themeNames[themeKey] || themeKey;

				const seg = document.createElement('button');
				seg.type = 'button';
				seg.className = `ring-segment${themeKey === currentTheme ? ' active' : ''}${theme.isLight ? '' : ' dark-label'}`;
				seg.style.background = theme.ringColor || theme.btnBg;
				seg.style.setProperty('--i', idx);
				seg.style.setProperty('--angle', `${angle}deg`);
				seg.style.setProperty('--start-angle', `${startAngle}deg`);
				seg.style.setProperty('--label-tilt', `${labelTilt}deg`);
				seg.setAttribute('data-theme', themeKey);
				seg.setAttribute('aria-label', themeName);
				seg.innerHTML = `<span class="ring-theme-name">${escapeHtml(themeName)}</span>`;

				seg.addEventListener('click', (e) => {
					e.stopPropagation();
					applyTheme(themeKey, true);
					document.getElementById('themeRingPanel')?.classList.remove('open');
				});

				container.appendChild(seg);
			});
		}

    function applyTheme(themeName, save=true) {
        currentTheme = themeName; const t = THEMES[themeName];
        document.body.style.backgroundColor = t.bgBody; document.body.style.color = t.textPrimary;
        document.querySelector('.hero')?.style.setProperty('border-color', t.borderLight);
        document.querySelectorAll('.section-title').forEach(el=>el.style.borderBottomColor=t.borderLight);
        document.querySelectorAll('.profile-card').forEach(el=>{ el.style.backgroundColor=t.cardBg; el.style.borderColor=t.cardBorder; });
        document.querySelectorAll('.stats-mini').forEach(el=>{ el.style.backgroundColor=t.statBg; el.style.borderColor=t.cardBorder; });
        document.querySelectorAll('.repo-carousel-card').forEach(el=>{ el.style.backgroundColor=t.repoCardBg; el.style.borderColor=t.cardBorder; });
        document.querySelectorAll('.repo-name a').forEach(el=>el.style.color=t.linkColor);
        document.querySelectorAll('.dot').forEach(el=>{ el.style.backgroundColor=t.dotInactive; if(el.classList.contains('active')) el.style.backgroundColor=t.dotActive; });
        document.querySelectorAll('.marquee-item').forEach(el=>el.style.borderColor=t.cardBorder);
        if(dom.langSwitchBtn) { dom.langSwitchBtn.style.backgroundColor=t.ctrlBg; dom.langSwitchBtn.style.color=t.ctrlText; dom.langSwitchBtn.style.borderColor=t.borderLight; }
        const wheelBtn = document.getElementById('wheelTriggerBtn'); if(wheelBtn) { wheelBtn.style.backgroundColor=t.ctrlBg; wheelBtn.style.color=t.ctrlText; wheelBtn.style.borderColor=t.borderLight; }
        document.querySelectorAll('.carousel-btn').forEach(btn=>{ btn.style.backgroundColor=t.btnBg; btn.style.color=t.btnText; });
        const loaderDiv = document.getElementById('loadingSpinner'); if(loaderDiv) { loaderDiv.style.borderColor=t.loaderBorder; loaderDiv.style.borderTopColor=t.loaderTop; }
        const statusMsg = document.querySelector('.status-message'); if(statusMsg) statusMsg.style.backgroundColor=t.cardBg;
        updateMusicButtonTheme(); if(save) localStorage.setItem(STORAGE_THEME_KEY, themeName);
        loadSnakeSvg(); 
        const centerSpan = document.getElementById('centerThemeName'); if(centerSpan) centerSpan.innerText = TEXTS[currentLang].themeNames[themeName] || themeName;
        buildRingPanel();
        
        const links = document.querySelectorAll('#external-links .github-badge');
        links.forEach(link => {
            link.style.backgroundColor = t.btnBg;
            link.style.color = t.btnText;
        });
    }

function updateThemeWheelPosition() {
    const trigger = document.getElementById('wheelTriggerBtn');
    const panel = document.getElementById('themeRingPanel');
    if (!trigger || !panel) return;

    const rect = trigger.getBoundingClientRect();
    const panelSize = window.innerWidth <= 480 ? 200 : window.innerWidth <= 768 ? 220 : 260;
    const padding = 10;

    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;

    const minX = panelSize / 2 + padding;
    const maxX = window.innerWidth - panelSize / 2 - padding;
    const minY = panelSize / 2 + padding;
    const maxY = window.innerHeight - panelSize / 2 - padding;

    x = Math.min(Math.max(x, minX), maxX);
    y = Math.min(Math.max(y, minY), maxY);

    panel.style.setProperty('--wheel-x', `${x}px`);
    panel.style.setProperty('--wheel-y', `${y}px`);
}

function initThemeWheel() {
    buildRingPanel();

    const trigger = document.getElementById('wheelTriggerBtn');
    const panel = document.getElementById('themeRingPanel');

    if (!trigger || !panel) return;

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!panel.classList.contains('open')) {
            buildRingPanel();
            updateThemeWheelPosition();
        }

        panel.classList.toggle('open');
    });

    panel.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('click', () => {
        panel.classList.remove('open');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            panel.classList.remove('open');
        }
    });

    window.addEventListener('resize', () => {
        if (panel.classList.contains('open')) {
            updateThemeWheelPosition();
        }
    });

    window.addEventListener('scroll', () => {
        if (panel.classList.contains('open')) {
            updateThemeWheelPosition();
        }
    }, { passive: true });
}

    function renderLinks() {
        const t = TEXTS[currentLang];
        const theme = THEMES[currentTheme];
        const linksContainer = document.getElementById('external-links');
        if (!linksContainer) return;
        
        linksContainer.innerHTML = '';
        t.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'github-badge';
            a.setAttribute('data-tooltip', link.tooltip);
            a.style.backgroundColor = theme.btnBg;
            a.style.color = theme.btnText;
            a.innerHTML = `<i class="${link.icon}"></i> ${escapeHtml(link.name)} <i class="fas fa-arrow-up-right-from-squares" style="font-size: 0.65rem;"></i>`;
            linksContainer.appendChild(a);
        });
    }

    function setLanguage(lang, save=true) { 
        const oldLang = currentLang;
        currentLang = lang; 
        const t = TEXTS[lang]; 
        dom.siteTitle.innerText = t.siteTitle; 
        dom.siteTagline.innerText = t.tagline; 
        dom.langText.innerText = t.langBtn; 
        dom.loadingMsg.innerText = t.loading; 
        dom.reposTitle.innerText = t.reposTitle; 
        dom.galleryTitle.innerText = t.galleryTitle; 
        dom.footerText.innerText = t.footerText; 
        dom.footerSub.innerText = t.footerSub; 
        if(dom.repoCountBadge && reposData.length) dom.repoCountBadge.innerText = `${reposData.length} ${t.repoCountPrefix}`; 
        if(currentUserData) renderProfileCard(currentUserData, window._currentStatus, true); 
        if(reposData.length && dom.carouselTrack) { renderCarouselTrack(); updateCarousel(); } 
        if(save) localStorage.setItem(STORAGE_LANG_KEY, lang); 
        const centerSpan = document.getElementById('centerThemeName'); 
        if(centerSpan) centerSpan.innerText = t.themeNames[currentTheme] || currentTheme; 
        buildRingPanel();
        renderLinks();
    }

function renderProfileCard(user, status, animate = false) {
    currentUserData = user;
    const t = TEXTS[currentLang], theme = THEMES[currentTheme];
    const bioText = (user.bio && user.bio.trim()) ? user.bio : t.profileFallbackBio;
    const statusIcon = status === 'active' ? '💻' : (status === 'idle' ? '🌙' : '💤');
    const statusTitle = status === 'active' ? (currentLang==='zh'?'活跃编码中':'Active') : (status==='idle'?(currentLang==='zh'?'最近休息中':'Idle'):(currentLang==='zh'?'离线':'Offline'));
    const firstName = t.nameFirst;
    const secondName = t.nameSecond;
    const nameHtml = `<div class="name-wrapper"><span class="name-part">${escapeHtml(firstName)}</span><span style="margin:0 4px;">·</span><span class="name-part">${escapeHtml(secondName)}</span></div>`;
    
    const blogUrl = (user.blog && user.blog.startsWith('http')) ? user.blog : t.blogFallback.url;
    const blogText = user.blog ? truncateUrl(user.blog) : t.blogFallback.text;
    
    dom.profileContainer.innerHTML = `<div class="profile-card" style="background:${theme.cardBg}; border-color:${theme.cardBorder};"><div class="profile-info"><div class="avatar-wrapper"><img class="avatar" src="${user.avatar_url}" alt="avatar" style="border-color:${theme.borderLight};"><div class="status-indicator ${status}" title="${statusTitle}">${statusIcon}</div></div><div class="profile-text"><h2>${nameHtml}</h2><div class="profile-bio">${escapeHtml(bioText)}</div><div class="profile-meta"><span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(user.location || t.locationFallback)}</span><span><i class="fas fa-link"></i> <a href="${blogUrl}" target="_blank" style="color:${theme.accentMuted};">${blogText}</a></span></div></div></div><div class="stats-mini" style="background:${theme.statBg}; border-color:${theme.cardBorder};"><div class="stat-item"><div class="stats-number">${user.public_repos ?? 0}</div><div class="stats-label">${t.reposLabel}</div></div><div class="stat-item"><div class="stats-number">${user.followers ?? 0}</div><div class="stats-label">${t.followersLabel}</div></div><div class="stat-item"><div class="stats-number">${user.following ?? 0}</div><div class="stats-label">${t.followingLabel}</div></div></div></div>`;
}

    function renderCarouselTrack() { if(!dom.carouselTrack) return; dom.carouselTrack.innerHTML=''; const t=TEXTS[currentLang], theme=THEMES[currentTheme]; const langColorMap={'JavaScript':'#e6b450','TypeScript':'#2d7a6e','HTML':'#cf6f2e','CSS':'#3d6b7c','Python':'#4f7e6b','Java':'#b0723b','Go':'#4c9b8f','Rust':'#b26b3a','Vue':'#4d7c6b','React':'#467c7a','Shell':'#7c7a58','default':'#9b958b'}; reposData.forEach(repo=>{const lang=repo.language; const langColor=langColorMap[lang]||langColorMap.default; const langSpan=lang?`<span class="lang-color" style="background-color:${langColor};"></span> ${escapeHtml(lang)}`:''; const updated=repo.updated_at?new Date(repo.updated_at).toLocaleDateString(currentLang==='zh'?'zh-CN':'en-US',{year:'numeric',month:'short',day:'numeric'}):(currentLang==='zh'?'近期':'recent'); const card=document.createElement('div'); card.className='repo-carousel-card'; card.style.backgroundColor=theme.repoCardBg; card.style.borderColor=theme.cardBorder; card.innerHTML=`<div class="repo-name"><i class="fab fa-github-alt"></i><a href="${repo.html_url}" target="_blank" style="color:${theme.linkColor};">${escapeHtml(repo.name)}</a></div><div class="repo-desc" style="color:${theme.accentMuted};">${escapeHtml(repo.description||t.noDesc)}</div><div class="repo-meta" style="border-top-color:${theme.borderLight}; color:${theme.accentMuted};">${lang?`<span>${langSpan}</span>`:''}<span><i class="far fa-star"></i> ${repo.stargazers_count??0}</span><span><i class="fas fa-code-branch"></i> ${repo.forks_count??0}</span><span><i class="far fa-calendar-alt"></i> ${updated}</span></div>`; dom.carouselTrack.appendChild(card);}); }
    function renderDots() { if(!dom.repoDots) return; const total=Math.max(1, reposData.length-itemsPerView+1); dom.repoDots.innerHTML=''; for(let i=0;i<total;i++){ const dot=document.createElement('div'); dot.classList.add('dot'); dot.style.backgroundColor=THEMES[currentTheme].dotInactive; dot.addEventListener('click',()=>{stopAutoPlay(); currentIndex=i; updateCarousel(); startAutoPlay();}); dom.repoDots.appendChild(dot);} }
    function updateCarousel() { const first=dom.carouselTrack?.children[0]; if(!first) return; const w=first.offsetWidth, gap=parseFloat(getComputedStyle(dom.carouselTrack).gap)||16; dom.carouselTrack.style.transform=`translateX(-${currentIndex*(w+gap)}px)`; const dots=document.querySelectorAll('#repoDots .dot'); dots.forEach((dot,idx)=>{ if(idx===currentIndex){ dot.classList.add('active'); dot.style.backgroundColor=THEMES[currentTheme].dotActive; dot.style.width='20px'; }else{ dot.classList.remove('active'); dot.style.backgroundColor=THEMES[currentTheme].dotInactive; dot.style.width='6px'; } }); }
    function startAutoPlay() { if(autoPlayInterval) clearInterval(autoPlayInterval); autoPlayInterval=setInterval(()=>{ if(!isHovering && reposData.length){ const maxIdx=Math.max(0, reposData.length-itemsPerView); currentIndex=currentIndex<maxIdx?currentIndex+1:0; updateCarousel(); } },4000); }
    function stopAutoPlay() { if(autoPlayInterval) clearInterval(autoPlayInterval); autoPlayInterval=null; }
    function updateItemsPerView() { if(window.innerWidth<=700) itemsPerView=1; else if(window.innerWidth<=900) itemsPerView=2; else itemsPerView=3; }
    function initCarousel() { if(!reposData.length) return; if(dom.repoCountBadge) dom.repoCountBadge.innerText=`${reposData.length} ${TEXTS[currentLang].repoCountPrefix}`; updateItemsPerView(); renderCarouselTrack(); renderDots(); updateCarousel(); const cont=document.querySelector('.carousel-container'); if(cont){ cont.addEventListener('mouseenter',()=>{isHovering=true; stopAutoPlay();}); cont.addEventListener('mouseleave',()=>{isHovering=false; startAutoPlay();}); } window.addEventListener('resize',()=>{ updateItemsPerView(); renderCarouselTrack(); renderDots(); currentIndex=0; updateCarousel(); stopAutoPlay(); startAutoPlay(); }); if(dom.repoPrevBtn) dom.repoPrevBtn.onclick=()=>{ stopAutoPlay(); const maxIdx=Math.max(0, reposData.length-itemsPerView); currentIndex=currentIndex>0?currentIndex-1:maxIdx; updateCarousel(); startAutoPlay(); }; if(dom.repoNextBtn) dom.repoNextBtn.onclick=()=>{ stopAutoPlay(); const maxIdx=Math.max(0, reposData.length-itemsPerView); currentIndex=currentIndex<maxIdx?currentIndex+1:0; updateCarousel(); startAutoPlay(); }; startAutoPlay(); }

    async function loadMarqueeGallery() { try { const res=await fetch('pictures/list.txt'); if(!res.ok) throw new Error(); const text=await res.text(); const existing=text.split('\n').map(l=>l.trim()).filter(l=>l.length&&!l.startsWith('#')); if(!existing.length){ dom.marqueeSection.style.display='none'; return; } galleryImages=existing; dom.marqueeSection.style.display='block'; renderMarquee(); startMarqueeAnimation(); const wrap=document.querySelector('.marquee-wrapper'); if(wrap){ wrap.addEventListener('mouseenter',()=>{ isMarqueeHovering=true; }); wrap.addEventListener('mouseleave',()=>{ isMarqueeHovering=false; }); } window.addEventListener('resize',()=>{ calculateMarqueeWidth(); }); } catch(e){ dom.marqueeSection.style.display='none'; } }
    function calculateMarqueeWidth() { if(!dom.marqueeTrack?.children.length) return; marqueeTotalWidth=0; for(let i=0;i<dom.marqueeTrack.children.length;i++) marqueeTotalWidth+=dom.marqueeTrack.children[i].offsetWidth+16; marqueeContainerWidth=document.querySelector('.marquee-wrapper').offsetWidth; marqueePosition=0; if(dom.marqueeTrack) dom.marqueeTrack.style.transform='translateX(0px)'; }
    function startMarqueeAnimation() { if(marqueeAnimationId) cancelAnimationFrame(marqueeAnimationId); let last=0; function animate(now){ if(!last) last=now; const delta=Math.min(100, now-last); if(delta>0 && !isMarqueeHovering && marqueeTotalWidth>marqueeContainerWidth){ marqueePosition-=marqueeSpeed*(delta/16); if(marqueePosition<=-marqueeTotalWidth/2) marqueePosition+=marqueeTotalWidth/2; if(dom.marqueeTrack) dom.marqueeTrack.style.transform=`translateX(${marqueePosition}px)`; } last=now; marqueeAnimationId=requestAnimationFrame(animate); } marqueeAnimationId=requestAnimationFrame(animate); }
    function renderMarquee() { if(!dom.marqueeTrack) return; dom.marqueeTrack.innerHTML=''; const theme=THEMES[currentTheme]; [...galleryImages,...galleryImages].forEach((src,idx)=>{ const item=document.createElement('div'); item.className='marquee-item'; item.style.borderColor=theme.cardBorder; const img=document.createElement('img'); img.loading='lazy'; img.src=src; img.alt=`Gallery ${idx+1}`; img.addEventListener('click',(e)=>{ e.stopPropagation(); openLightbox(src); }); item.appendChild(img); dom.marqueeTrack.appendChild(item); }); setTimeout(()=>calculateMarqueeWidth(),100); }

    async function fetchJSON(url){ const res=await fetch(url); if(!res.ok) throw new Error(); return res.json(); }
    async function loadGitHubData() { try { const [user, reposRaw, events] = await Promise.all([ fetchJSON(`https://api.github.com/users/${GITHUB_USERNAME}`), fetchJSON(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&direction=desc`), fetchJSON(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=1`) ]); let status='offline'; if(events && events.length){ const diff=(new Date()-new Date(events[0].created_at))/(1000*3600); if(diff<2) status='active'; else if(diff<24) status='idle'; } window._currentUserData=user; window._currentStatus=status; renderProfileCard(user,status); reposData=reposRaw.sort((a,b)=>(b.stargazers_count||0)-(a.stargazers_count||0)).slice(0,10); if(reposData.length){ dom.reposSection.style.display='block'; initCarousel(); } const loadingDiv=document.getElementById('loading-placeholder'); if(loadingDiv) loadingDiv.style.display='none'; loadMarqueeGallery(); } catch(e){ const loadingDiv=document.getElementById('loading-placeholder'); if(loadingDiv) loadingDiv.innerHTML='<div class="status-message"><i class="fas fa-cloud-moon"></i> 无法获取GitHub数据，请刷新重试。</div>'; dom.reposSection.style.display='none'; } }

    function init() {
        try { const savedTheme=localStorage.getItem(STORAGE_THEME_KEY); if(savedTheme && THEMES[savedTheme]) currentTheme=savedTheme; const savedLang=localStorage.getItem(STORAGE_LANG_KEY); if(savedLang && (savedLang==='zh'||savedLang==='en')) currentLang=savedLang; const savedMusicVisible=localStorage.getItem(STORAGE_MUSIC_VISIBLE_KEY); if(savedMusicVisible==='hidden') musicIframeVisible=false; else musicIframeVisible=true; } catch(e){}
        initThemeWheel(); applyTheme(currentTheme, false); setLanguage(currentLang, false);
        initMusicPlayer();
        if (musicIframeVisible) {
            musicIframeContainer.classList.add('show');
        }
        if (musicBtn) {
            musicBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMusicIframe();
            });
        }
        updateMusicButtonTheme();
        if(dom.langSwitchBtn) dom.langSwitchBtn.addEventListener('click', ()=>{ setLanguage(currentLang==='zh'?'en':'zh', true); });
        renderLinks();
        loadGitHubData();
    }
    init();
})();
