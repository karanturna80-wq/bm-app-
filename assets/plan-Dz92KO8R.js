import{_t as e}from"./pieces-D5Wbtaxa.js";import{b as t,f as n}from"./model-RePW-bCH.js";import{c as r,n as i,t as a}from"./index-DQAB6VL3.js";import{PlanBody as o,t as s}from"./plan-6050zeNI.js";var c=e(),l=`
.wl-plan .pl-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:stretch}
.wl-plan .pl-cards>[data-card]{min-width:0}
.wl-plan .pl-cards>[data-card]>.pc{margin:0;height:100%}
.wl-plan .pl-cards>.pl-open{grid-column:1/-1;order:1}
.wl-plan .pl-cards>[data-card]:not(.pl-open) [data-preview]{display:none}
.wl-plan [data-six]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;align-items:start}
.wl-plan [data-six]>.claudeln,.wl-plan [data-six]>[data-week="unknown"]{grid-column:1/-1}
.wl-plan [data-six] .grp{margin:0}
.wl-plan [data-filters]{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.wl-pfin{display:flex;align-items:center;gap:10px;flex-wrap:wrap;border:1px solid var(--edge);border-radius:12px;padding:8px 12px;font:12px var(--mono);color:var(--ink)}
.wl-pfin .k{color:var(--faint);letter-spacing:.06em;text-transform:uppercase}
.wl-plan .pl-map{max-width:440px}
`;function u(e){let t=s(e.view?.evaluation??null,e.project);return t===null||n(t.cards)?null:t.cards[0]?.top[0]??null}function d(e){let r=e.view?.evaluation??null,a=i(),u=s(r,e.project),d=t(r,e.project),f=u===null?null:u.finishLine;return(0,c.jsxs)(`div`,{className:`wl-plan`,style:{display:`contents`},children:[(0,c.jsx)(`style`,{children:l}),(0,c.jsxs)(`div`,{className:`wl-phead`,"data-wide-head":``,children:[(0,c.jsx)(`span`,{className:`pt`,children:`Plan`}),(0,c.jsx)(`span`,{className:`ps`,children:d??`project unknown`}),(0,c.jsx)(`span`,{className:`grow`}),a.toggles]}),(0,c.jsx)(`div`,{className:`wl-pfin`,"data-finish-line":``,children:(0,c.jsx)(`span`,{children:f===null?`Finish unknown`:n(f)?`Finish unknown: ${f.why}`:n(f.words)?`Finish unknown: ${f.words.why}`:f.words})}),(0,c.jsx)(o,{props:e,initialOpen:`six`,wide:!0})]})}function f(e){let t=i(),n=u(e);return n===null?(0,c.jsx)(a,{title:`Plan`,onClose:()=>t.show({kind:`page`}),children:(0,c.jsx)(`div`,{className:`m`,children:`Nothing urgent: the Core gives Next six weeks no rows`})}):(0,c.jsx)(r,{props:e,subject:{kind:`job`,id:n},back:{route:`plan`,project:e.project},onClose:()=>t.show({kind:`page`})},n)}export{f as Panel,d as default};