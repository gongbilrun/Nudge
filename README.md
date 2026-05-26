# Nudge

항상 위에 떠있는 일정 위젯

## 폴더 구조

```
nudge/
├── index.html          ← 랜딩페이지 (Vercel 배포)
└── electron/
    ├── package.json
    ├── main.js
    ├── preload.js
    └── widget.html
```

## 랜딩페이지 → Vercel 배포

1. GitHub public 레포 생성
2. 이 폴더 전체 push
3. Vercel → Import → root directory `/` → Deploy

## Electron 앱 실행

```bash
cd electron
npm install
npm start
```

## 앱 빌드

```bash
npm run build:win   # → dist/Nudge Setup.exe
npm run build:mac   # → dist/Nudge.dmg
```

빌드 후 GitHub Releases에 업로드하면 랜딩페이지 다운로드 버튼과 연결됩니다.
