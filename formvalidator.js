var FormValidator = (function(jQuery){
	
	var $ = jQuery;

	var self = FormValidator = function(form_id) {
		if (!form_id || form_id.match('#').length === 0){
			throw Error("Sorry, I need a valid ID like: \"#someId\" and you gave me: " + form_id);
		}

		var self = this;
		this.model = [];
		this.form = $(form_id);

		this.form.attr('novalidate','');

		if (this.form.length === 0){
			throw Error("Sorry, I can't find any element with the ID \""+form_id+"\" ");
		}

		var i;
		this.form_inputs = this.form.children('input');
		var children_length = this.form_inputs.length;
		for (i = 0; i < children_length; i++){
			parseValidationRules.call(this, this.form_inputs[i]);
		}

		//console.log(this.model);

		this.form.submit(function(e){
			e.preventDefault();
			validateForm.call(self);
		});

	};

	function parseValidationRules(input) {
		var input = $(input);
		var rules = {};
		var validation_rules = getValidationRules(input);
		
		if ( validation_rules.has_rules ){

			var type = input.attr('type');
			var rules_str = validation_rules.data_rules;

			if (rules_str) {
				rules_arr = rules_str.replace(' ', '').split(',');
				rules = createKeyValuePairs(rules_arr);
				delete validation_rules.data_rules;
				$.extend(validation_rules, rules);
			}

			this.model.push({
				input_id: '#' + input.attr('id'),
				type: type,
				input_el: input[0],
				rules: validation_rules
			});
		}
		else {
			console.warn("Input: \"" + $(input).attr('name') + "\" has no \"data-rules\" attribute, so this input won't be validated.");
		}
		return this.model;
	}

	function getValidationRules(input) {

		var rules = {has_rules : false};
		if ( input.attr('required') ){
			rules.required = true;
			rules.has_rules = true;
		}
		if ( input.attr('data-rules') ){
			rules.data_rules = input.attr('data-rules');
			rules.has_rules = true;
		}
		if ( input.attr('min') ){
			rules.min = input.attr('min');
			rules.has_rules = true;
		}
		if ( input.attr('max') ){
			rules.max = input.attr('max');
			rules.has_rules = true;
		}
		if ( input.attr('maxlength') ){
			rules.maxlength = input.attr('maxlength');
			rules.has_rules = true;
		}
		return rules;
	}

	function createKeyValuePairs(rules_arr) {
		var obj = {};
		for (var i in rules_arr){
			var key = rules_arr[i].split(':')[0];
			var value = rules_arr[i].split(':')[1];
			obj[key] = value;
		}
		return obj;
	}

	function validateForm() {
		for(var i = 0, length = this.form_inputs.length; i < length; i++) {

			var input = this.form_inputs[i];
			var value = input.value;
			var error_messages = validateInput.call(this, input, value);

			//console.log('Input: ', input, 'has ' + error_messages.length + ' errors.');

			if(error_messages.length > 0){
				var j = 0;
				var error_message = '<ul class="error_message">';
				do{
					error_message += "\n\t<li>"+error_messages[j]+"</li>";
					j += 1;
				} while(j < error_messages.length)
				/*
				error_message += "\n</ul>"
				$(input).next('.error_message').remove();
				$(input).after(error_message);
				$('.error_message').animate({
					opacity: [1, 'linear'],
					top: ['-65px', 'swing']
					}, 550);
				*/
				$(input).addClass('error');
			} else {
				//$(input).next('.error_message').remove();
				$(input).removeClass('error');
			}
		}
	}

	function validateInput(input, value) {
		var rules = getInputRules.call(this, input),
		    key,
		    validate,
		    error_messages = [];

		if (rules) {
			for (var key in rules){
				if(key.toString() !== 'has_rules'){
					validate = 'validate' + key[0].toUpperCase() + key.substr(1) + '.call(this, input, value, rules[key])';
					
					try{
						isValid = eval(validate);
					} catch(error){
						console.warn('Looks like the validation rule: "'+key+'" is not well written.');
					}

					if (!isValid){
						error_messages.push(getErrorMessage(key, rules[key]));
					}
				}
			}
		}

		return error_messages;
	}

	function getInputRules(input) {
		var rules, i = 0, length = this.model.length;
		do {
			if (this.model[i].input_el === input){
				rules = this.model[i].rules;
			}
			i += 1;
		} while (i < length)
		return rules;
	}

	function validateRequired(input, value, rule_value) {
		return value.length > 0;
	}

	function validateMinlength(input, value, rule_value) {
		return value.length >= rule_value;
	}

	function validateMaxlength(input, value, rule_value) {
		return value.length <= rule_value;
	}

	function validateMin(input, value, rule_value) {
		return value >= rule_value;
	}

	function validateMax(input, value, rule_value) {
		return value <= rule_value;
	}

	function getErrorMessage(key, rule_val) {
		/** TODO make messages an object property and make it extendable when instantiating the object.*/
		var messages = {
			required: 'This field is required.',
			minlength: 'The minimum length must be ' + rule_val,
			maxlength: 'The maximum length  must be ' + rule_val,
			min: 'The minium value must be ' + rule_val,
			max: 'The maxium value must be ' + rule_val
		}
		return messages[key];
	}
	//self.prototype.doSomething = function() {};

	return FormValidator;

})(jQuery);

new FormValidator('#myForm');