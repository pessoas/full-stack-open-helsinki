(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),c=t.n(r),u=t(2),l=function(e){var n=e.filter,t=e.hfilter;return o.a.createElement("div",null,"filter shown with: ",o.a.createElement("input",{value:n,onChange:t,placeholder:"enter search"}))},i=function(e){var n=e.submit,t=e.name,a=e.hname,r=e.phone,c=e.hphone;return o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,"name: ",o.a.createElement("input",{type:"text",value:t,onChange:a,placeholder:"Enter contact name"})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{type:"number",value:r,onChange:c,placeholder:"Enter contact number"})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},m=function(e){return o.a.createElement("p",null,e.name," ",e.phone," ",o.a.createElement("button",{onClick:e.removeContact},"delete"))},f=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{style:{color:"green",bacground:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n)},d=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{style:{color:"red",bacground:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n)},s=t(3),p=t.n(s),h="/api/persons",b=function(){return p.a.get(h).then((function(e){return e.data}))},g=function(e){return p.a.post(h,e).then((function(e){return e.data}))},v=function(e){return p.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},E=function(e,n){return p.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},y=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),s=Object(u.a)(c,2),p=s[0],h=s[1],y=Object(a.useState)(""),w=Object(u.a)(y,2),C=w[0],j=w[1],O=Object(a.useState)(""),S=Object(u.a)(O,2),k=S[0],T=S[1],U=Object(a.useState)(null),B=Object(u.a)(U,2),x=B[0],z=B[1],D=Object(a.useState)(null),I=Object(u.a)(D,2),J=I[0],R=I[1];Object(a.useEffect)((function(){console.log("effect"),b().then((function(e){r(e)}))}),[]);var A=function(e){if(console.log(e),window.confirm("Do you realy want to delete the contact?")){var n=t.find((function(n){return n.id===e})),a=t.filter((function(n){return n.id!==e}));console.log(n),v(n.id).then((function(e){console.log(e),r(a)})).catch((function(a){R("Information of ".concat(n.name," has already been removed from server")),setTimeout((function(){R(null)}),5e3),r(t.filter((function(n){return n.id!==e})))}))}};return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(l,{filter:k,hfilter:function(e){console.log(e.target.value),T(e.target.value)}}),o.a.createElement("h3",null,"Add new contact "),o.a.createElement(f,{message:x}),o.a.createElement(d,{message:J}),o.a.createElement(i,{submit:function(e){if(e.preventDefault(),p&&C){var n=t.find((function(e){return e.name.toUpperCase()===p.toUpperCase()}));if(console.log(n),n){if(window.confirm("Want to update the contact?")){var a={name:p,number:C},o=t.filter((function(e){return e.id!==n.id}));E(n.id,a).then((function(e){r(o.concat(e)),h(""),j("")})).then((function(){z("Contact ".concat(a.name," updated")),setTimeout((function(){z(null)}),5e3)}))}}else{var c={name:p,number:C};g(c).then((function(e){r(t.concat(e)),h(""),j("")})).then((function(){z("Contact ".concat(c.name," succesfully added")),setTimeout((function(){z(null)}),5e3)})).catch((function(e){console.log(e.response.data),R("".concat(e.response.data.error)),setTimeout((function(){R(null)}),5e3)}))}}else alert("Name and or number are empty")},name:p,hname:function(e){console.log(e.target.value),h(e.target.value)},phone:C,hphone:function(e){console.log(e.target.value),j(e.target.value)}}),o.a.createElement("h3",null,"Contacts"),function(){if(k){return o.a.createElement("div",null," ",t.map((function(e){if(e.name.toUpperCase().includes(k.toUpperCase()))return console.log(e.id),o.a.createElement(m,{name:e.name,phone:e.number,removeContact:function(){return A(e.id)},key:e.id})}))," ")}return o.a.createElement("div",null," ",t.map((function(e){return o.a.createElement(m,{name:e.name,phone:e.number,removeContact:function(){return A(e.id)},key:e.id})}))," ")}())};c.a.render(o.a.createElement(y,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a9c27031.chunk.js.map