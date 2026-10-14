import{_t as e}from"./pieces-D5Wbtaxa.js";import{b as t}from"./model-RePW-bCH.js";import{n}from"./index-DQAB6VL3.js";import{HistoryBody as r}from"./history-B6iszSDt.js";var i=e(),a=`
.wl-hist{display:flex;flex-direction:column;gap:12px;max-width:740px}
.wl-hist .hi-tools [data-search]{max-width:260px}
.wl-hist .pz-day{padding:0 16px}
.wl-hist .pz-dayh .d,.wl-hist .pz-dayh .n{font:12px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-hi)}
.wl-hist [data-lines]>[data-entry]+[data-entry]{border-top:1px solid var(--edge)}
`;function o(e){let o=e.view?.evaluation??null,s=n(),c=t(o,e.project);return(0,i.jsxs)(`div`,{className:`wl-hist`,children:[(0,i.jsx)(`style`,{children:a}),(0,i.jsxs)(`div`,{className:`wl-phead`,"data-wide-head":``,children:[(0,i.jsx)(`span`,{className:`pt`,children:`History`}),(0,i.jsx)(`span`,{className:`ps`,children:c??`project unknown`}),(0,i.jsx)(`span`,{className:`grow`}),s.toggles]}),(0,i.jsx)(r,{props:e,wide:!0})]})}export{o as default};