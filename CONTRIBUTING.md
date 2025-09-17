# Contributing to Bangla Calendar

Thank you for your interest in contributing! 🙏
Your help makes this project better for everyone.

## 📌 Ways to Contribute
- Report bugs
- Suggest new features or improvements
- Improve performance or accessibility
- Refactor or simplify code
- Add documentation or translations
- Create issues for ideas you cannot implement

## 🧱 Project Philosophy
- **Lightweight**: No heavy build tooling (pure HTML/CSS/JS)
- **Accuracy**: Calendar conversion correctness is priority #1
- **Readability**: Prefer clear code over clever one-liners
- **Mobile-first**: Design & spacing tuned for small screens
- **Progressive enhancement**: Modern CSS where available, graceful fallback

## 🛠 Local Setup
```bash
# 1. Fork the repository (on GitHub UI)
# 2. Clone your fork
git clone https://github.com/<your-username>/bangla-calendar.git
cd bangla-calendar

# 3. Open in your browser
# (Simply open index.html) OR run a light dev server:
npm install -g live-server
live-server
```

## 🗂 Key Files
| File | Purpose |
|------|---------|
| `index.html` | Main markup + footer script |
| `styles.css` | Layout, responsive design, animations |
| `calendar.js` | Core logic: conversion + rendering |
| `README.md` | Project documentation |

## 🧪 Testing Your Changes
Since there is no formal test suite yet:
- Check multiple months (including mid-month transitions)
- Verify Bangla month boundary transitions (e.g., 14 Apr, 15 May, etc.)
- Confirm today highlighting works
- Inspect mobile layout (use dev tools responsive mode)
- Ensure no console errors

## 🧾 Commit Message Convention
Use short, descriptive messages:
```
feat: add holiday highlighting logic
fix: correct Ashwin start date offset
style: reduce mobile cell padding
docs: add accessibility notes
refactor: simplify renderCalendar loop
```

## 🔀 Pull Request Checklist
Before submitting a PR:
- [ ] Code is formatted & readable
- [ ] Only relevant changes included (no unrelated reformatting)
- [ ] Works in mobile + desktop viewports
- [ ] No console errors
- [ ] Updated docs if behavior changed
- [ ] Linked the related issue (if any)

## 🐞 Reporting Bugs
Please open an issue with:
- What you expected vs. what happened
- Exact date/month/year if conversion error
- Screenshot (if UI/layout issue)
- Browser + device info

## 💡 Suggesting Features
Include:
- Problem it solves
- Suggested UI/UX (sketch or text)
- Any performance / complexity concerns

## 🌍 Translations / Localization
Interested in adding English UI toggle? Open an issue to discuss plan before starting.

## 🤝 Code of Conduct
All interactions must follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🧭 Roadmap Ideas (Open to PRs)
- PWA install support
- Holiday dataset & highlighting
- Dark mode toggle
- A11y improvements (roles, keyboard nav)
- Print/export view
- Optional mini date converter widget

## 🙌 Thanks
Your contributions help preserve and promote Bengali cultural computing. ⭐

Feel free to ask questions—no contribution is too small!
