import{_t as e}from"./pieces-D5Wbtaxa.js";import{b as t}from"./model-RePW-bCH.js";import{i as n}from"./index-D2YWc9Io.js";var r=e(),i=`
.wl-problems{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:start}
.wl-problems>*{min-width:0}
.wl-problems .card,.wl-problems .pc{margin:0}
.wl-problems .box,.wl-problems [data-section="first-day"],.wl-problems [data-problems]>[role="alert"],.wl-problems [data-problems]>.greyc{grid-column:1/-1}
.wl-problems>[data-problems]{display:contents}
`;function a(e){let a=t(e.view?.evaluation??null,e.project);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{children:i}),(0,r.jsxs)(`div`,{className:`wl-phead`,"data-wide-head":``,children:[(0,r.jsx)(`span`,{className:`pt`,children:`Problems`}),(0,r.jsx)(`span`,{className:`ps`,children:a??`project unknown`}),(0,r.jsx)(`span`,{className:`grow`})]}),(0,r.jsx)(`div`,{className:`wl-problems`,children:(0,r.jsx)(n,{...e})})]})}export{a as default};