var FormValidator=function(f){function g(a){var a=e(a),b={},c=a,b={has_rules:!1};if(c.attr("required"))b.required=!0,b.has_rules=!0;if(c.attr("data-rules"))b.data_rules=c.attr("data-rules"),b.has_rules=!0;if(c.attr("min"))b.min=c.attr("min"),b.has_rules=!0;if(c.attr("max"))b.max=c.attr("max"),b.has_rules=!0;if(c.attr("maxlength"))b.maxlength=c.attr("maxlength"),b.has_rules=!0;if(b.has_rules){var c=a.attr("type"),d=b.data_rules;if(d){var d=rules_arr=d.replace(" ","").split(","),i={},h;for(h in d){var f=
d[h].split(":")[0],g=d[h].split(":")[1];i[f]=g}delete b.data_rules;e.extend(b,i)}this.model.push({input_id:"#"+a.attr("id"),type:c,input_el:a[0],rules:b})}else console.warn('Input: "'+e(a).attr("name")+'" has no "data-rules" attribute, so this input won\'t be validated.');return this.model}function j(){for(var a=0,b=this.form_inputs.length;a<b;a++){var c=this.form_inputs[a],d=k.call(this,c,c.value);0<d.length?e(c).addClass("error").val(d[0]).bind("click",function(){this.select();e(this).removeClass("error")}):
e(c).removeClass("error")}}function k(a){var a=l.call(this,a),b,c,d=[];if(a)for(b in a)if("has_rules"!==b.toString()){c="validate"+b[0].toUpperCase()+b.substr(1)+".call(this, input, value, rules[key])";try{isValid=eval(c)}catch(e){console.warn('Looks like the validation rule: "'+b+'" is not well written.')}isValid||d.push({required:"Required field",minlength:"The minimum length must be "+a[b],maxlength:"The maximum length  must be "+a[b],min:"The minium value must be "+a[b],max:"The maxium value must be "+
a[b]}[b])}return d}function l(a){var b,c=0,d=this.model.length;do{if(this.model[c].input_el===a)b=this.model[c].rules;c+=1}while(c<d);return b}var e=f;return FormValidator=function(a){if(!a||0===a.match("#").length)throw Error('Sorry, I need a valid ID like: "#someId" and you gave me: '+a);var b=this;this.model=[];this.form=e(a);this.form.attr("novalidate","");if(0===this.form.length)throw Error("Sorry, I can't find any element with the ID \""+a+'" ');this.form_inputs=this.form.children("input");
for(var c=this.form_inputs.length,a=0;a<c;a++)g.call(this,this.form_inputs[a]);this.form.submit(function(a){a.preventDefault();e("input.error").val("");j.call(b)})}}(jQuery);