;(function() {
	assume = function() {
		return {
			that : function(actual) {
				return {
					is : function(excepted) {
						expect(actual).toBe(excepted);
					},

					isNot : function(excepted) {
						expect(actual).not.toBe(excepted);
					}
				}
			}
		};
	}();
})();