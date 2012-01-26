var FormValidator=function(f){function g(b){var b=d(b),a={},c=b,a={has_rules:!1};if(c.attr("required"))a.required=!0,a.has_rules=!0;if(c.attr("data-rules"))a.data_rules=c.attr("data-rules"),a.has_rules=!0;if(c.attr("min"))a.min=c.attr("min"),a.has_rules=!0;if(c.attr("max"))a.max=c.attr("max"),a.has_rules=!0;if(c.attr("maxlength"))a.maxlength=c.attr("maxlength"),a.has_rules=!0;if("email"===c.attr("type"))a.email=!0,a.has_rules=!0;if(a.has_rules){var c=b.attr("type"),e=a.data_rules;if(e){var e=rules_arr=
e.replace(" ","").split(","),i={},h;for(h in e){var f=e[h].split(":")[0],g=e[h].split(":")[1];i[f]=g}delete a.data_rules;d.extend(a,i)}this.model.push({input_id:"#"+b.attr("id"),type:c,input_el:b[0],rules:a})}else console.warn('Input: "'+d(b).attr("name")+'" has no "data-rules" attribute, so this input won\'t be validated.');return this.model}function j(){for(var b=0,a=this.form_inputs.length;b<a;b++){var c=this.form_inputs[b],e=k.call(this,c,c.value);0<e.length?(d(c).attr("data-value",d(c).val()),
d(c).addClass("error").val(e[0]),d(c).one("click",function(){var a=d(this);a.removeClass("error");0<a.attr("data-value").length?a.val(a.attr("data-value")):a.val("")})):d(c).removeClass("error")}}function k(b){var b=l.call(this,b),a,c,e=[];if(b)for(a in b)if("has_rules"!==a.toString()){c="validate"+a[0].toUpperCase()+a.substr(1)+".call(this, input, value, rules[key])";try{isValid=eval(c)}catch(d){console.warn('Looks like the validation rule: "'+a+'" is not well written.')}isValid||e.push({required:"Required field",
minlength:"The minimum length must be "+b[a],maxlength:"The maximum length  must be "+b[a],min:"The minimum value must be "+b[a],max:"The maximum value must be "+b[a],email:"Please type a valid email"}[a])}return e}function l(b){var a,c=0,e=this.model.length;do{if(this.model[c].input_el===b)a=this.model[c].rules;c+=1}while(c<e);return a}var d=f;return FormValidator=function(b){if(!b||0===b.match("#").length)throw Error('Sorry, I need a valid ID like: "#someId" and you gave me: '+b);var a=this;this.model=
[];this.form=d(b);this.form.attr("novalidate","");if(0===this.form.length)throw Error("Sorry, I can't find any element with the ID \""+b+'" ');this.form_inputs=this.form.children("input");for(var c=this.form_inputs.length,b=0;b<c;b++)g.call(this,this.form_inputs[b]);this.form.submit(function(b){b.preventDefault();d("input.error").each(function(){d(this).val().match(/Required field|The minimum length must be \d|The maximum length must be \d|The minimum value must be \d|The maximum value must be \d|Please type a valid email/)&&
d(this).val(d(this).attr("data-value"))});j.call(a)})}}(jQuery);