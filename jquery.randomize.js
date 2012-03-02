/* 
	jquery.randomize.js
	Author: Axel Esquite
	Date: Thurs March 1, 2012
	
	Usage:
	$('#squares').reorder(function(e){...});
	$('#squares').reorder({order: [...,...,...],
		onStart: function(e) {...},
		onOrder: function(e) {...},
		onDone: function(e) {...}
	});

	LICENSE (BSD):

	Copyright 2011 Axel Esquite, all rights reserved.

	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:

	  1. Redistributions of source code must retain the above copyright
	     notice, this list of conditions and the following disclaimer.

	  2. Redistributions in binary form must reproduce the above copyright
	     notice, this list of conditions and the following disclaimer in the
	     documentation and/or other materials provided with the distribution.

	  3. Neither the name of this module nor the names of its contributors may
	     be used to endorse or promote products derived from this software
	     without specific prior written permission.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
(function($) {
    $.fn.reorder = function(options) {

        var order, onStart, onOrdered, onFinished, fadeInDelay;

        if (typeof options === 'object') {
            for (var prop in options) {
                switch (prop) {
                case 'order':
                    order = options.order;
                    break;
                case 'onStart':
                    onStart = options.onStart
                    break;
                case 'onOrder':
                    onOrdered = options.onOrder;
                    break;
                case 'onDone':
                    onFinished = options.onDone;
                    break;
                case 'fadeIn':
                    fadeInDelay = options.fadein;
                    break;
                }
            }
        }
        else if (typeof options === 'function') {
            onFinished = options;
        }
        // random array sort from
        // http://javascript.about.com/library/blsort2.htm


        function randOrd() {
            return (Math.round(Math.random()) - 0.5);
        }

        return ($(this).each(function() {
            var $this = $(this),
                $children = $this.children(),
                iEnd = $children.length - 1;
            if (typeof order !== 'undefined' && order.length > 0) {
                $.each(order, function(j, k) {
                    $this.append($children.eq(k));
                    if (j === iEnd && onFinished != undefined) {
                        onFinished($children.eq(k));
                    }
                    else if (typeof onOrdered !== 'undefined') {
                        onOrdered($children.eq(k));
                    }
                });
            }
            else {
                var indices = [];
                for (i = 0; i < $children.length; i++) {
                    indices[indices.length] = i;
                }
                indices = indices.sort(randOrd);
                $.each(indices, function(j, k) {
                    $this.append($children.eq(k));
                    if (j === iEnd && onFinished != undefined) {
                        onFinished($children.eq(k));
                    }
                    else if (typeof onOrdered !== 'undefined') {
                        onOrdered($children.eq(k));
                    }

                });
            }
        }));
    };
})(jQuery);
