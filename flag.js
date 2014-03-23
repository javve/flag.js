( function(window, undefined) {
"use strict";

var r = Math.round,
    cr = Math.ceil,
    h;

window.flags = function(options) {
    options = options || {};

    var flags = [],
        init = {
            start: function() {
                var className = options['class'] || 'flag',
                    flags = h.getByClass(className, document.body),
                    i = 0, il = flags.length;
                    
                for (i = 0, il; i < il; i+=1) {
                    publicMethods.create(flags[i], options);
                }
            }
        },
        p = {
            cross: function(c, w, h, bottom, cross) {
                var cw = Math.min(w/16, h/16);
                c.fillStyle = bottom;
                c.fillRect(0, 0, w, h);
                c.fillStyle = cross;
                c.fillRect(w*0.3, 0, cw*4, h);
                c.fillRect(0, h*0.5 - cw*2, w, cw*4);
            },
            cross2: function(c, w, h, bottom, cross, cross2) {
                var cw = Math.min(w/16, h/16);
                c.fillStyle = bottom;
                c.fillRect(0, 0, w, h);
                c.fillStyle = cross;
                c.fillRect(w*0.3, 0, cw*4, h);
                c.fillRect(0, h*0.5 - cw*2, w, cw*4);
    
                c.fillStyle = cross2;
                c.fillRect(w*0.35, 0, cw*2, h);
                c.fillRect(0, h*0.5 - cw, w, cw*2);
            },
            centeredCross: function(c, w, h, bottom, cross, cross2) {
                var cw = Math.max(r(w/40), r(h/40)),
                    midHeight = h*0.5,
                    midWidth = w*0.5;
                
                c.fillStyle = bottom;
                c.fillRect(0, 0, w, h);
                c.fillStyle = cross;
                c.fillRect(0, midHeight-cw*2.5, w, cw*5);
                c.fillRect(midWidth-cw*2.5, 0, cw*5, h);
    
                
                c.fillStyle = cross2;
                c.fillRect(0, midHeight-cw, w, cw*2);
                c.fillRect(midWidth-cw, 0, cw*2, h);
                
            },
            v3stripes: function(c, w, h, one, two, three) {
                c.fillStyle = one;
                c.fillRect(0, 0, w, h);
                c.fillStyle = two;
                c.fillRect(cr(w/3), 0, r(w/3), h);
                c.fillStyle = three;
                c.fillRect(w-r(w/3), 0, r(w/3), h);
            },
            h3stripes: function(c, w, h, one, two, three) {
                c.fillStyle = one;
                c.fillRect(0, 0, w, h);
                c.fillStyle = two;
                c.fillRect(0, h-2*r(h/3), w, r(h/3));
                c.fillStyle = three;
                c.fillRect(0, h-r(h/3), w, r(h/3));
            },
            centerCircles: function(c, w, h, one) {
                c.fillStyle = one;
                c.arc(w/2, h/2, h/4, 0, 2 * Math.PI, false);
                c.fill();
            },
            /**
             * The diagonal cross in the british flag is weird, the white part is goes from corner to corner,
             * but the red on each "arm" is slightly skewed counter clock-wise.
             */
            britishDiagonalCross: function(c, w, h, one, two, three) {
                var cw = Math.max(r(w/40), r(h/40));
                c.fillStyle = one;
                c.fillRect(0, 0, w, h);
                
                c.beginPath();
                c.lineWidth = cw*4;
                c.strokeStyle = two;
                c.moveTo(0,0);
                c.lineTo(w,h);
                c.stroke();
                c.beginPath();
                c.moveTo(0,h);
                c.lineTo(w,0);
                c.stroke();
                
                c.beginPath();
                c.lineWidth = cw*2;
                c.strokeStyle = three;
                c.moveTo(-cw*2, -cw);
                c.lineTo(w * 0.5 + cw*0.5 ,h * 0.5 + cw);
                c.stroke();
                c.beginPath();
                c.moveTo(w * 0.5 - cw*0.5 , h * 0.5 - cw);
                c.lineTo(w, h - cw * 0.5);
                c.stroke();
                
                c.beginPath();
                c.moveTo(-cw * 2, h + cw*2);
                c.lineTo(w *0.5 +cw*0.5, h*0.5);
                c.stroke();
                c.beginPath();
                c.moveTo(w*0.5 - cw*0.5, h*0.5);
                c.lineTo(w + cw, -cw*1.6);
                c.stroke();
                
            }
        },
        country = {
            se: function(c, w, h) {
                p.cross(c, w, h, '#1a579a', '#f7f400');
            },
            fi: function(c, w, h) {
                p.cross(c, w, h, '#fff', '#073382');
            },
            dk: function(c, w, h) {
                p.cross(c, w, h, '#cd142e', '#fff');
            },
            no: function(c, w, h) {
                p.cross2(c, w, h, '#ef2b2d', '#fff', '#002868');
            },
            is: function(c, w, h) {
                p.cross2(c, w, h, '#003897', '#fff', '#d72828');
            },
            be: function(c, w, h) {
                p.v3stripes(c, w, h, '#000000', '#fae042', '#ed2939');
            },
            td: function(c, w, h) {
                p.v3stripes(c, w, h, '#002664', '#fae042', '#ed2939');
            },
            ci: function(c, w, h) {
                p.v3stripes(c, w, h, '#f77f00', '#ffffff', '#009e60');
            },
            fr: function(c, w, h) {
                p.v3stripes(c, w, h, '#002395', '#ffffff', '#ed2939');
            },
            gn: function(c, w, h) {
                p.v3stripes(c, w, h, '#ce1126', '#fcd116', '#009460');
            },
            gt: function(c, w, h) {
                p.v3stripes(c, w, h, '#4997d0', '#ffffff', '#4997d0');
                // 74aa74 circle
            },
            ie: function(c, w, h) {
                p.v3stripes(c, w, h, '#009a49', '#ffffff', '#ff7900');
            },
            it: function(c, w, h) {
                p.v3stripes(c, w, h, '#009246', '#ffffff', '#ce2b37');
            },
            cm: function(c, w, h) {
                p.v3stripes(c, w, h, '#007a5e', '#ce1126', '#fcd116');
                // star #fcd116
            },
            ml: function(c, w, h) {
                p.v3stripes(c, w, h, '#14b53a', '#fcd116', '#ce1126');
            },
            ng: function(c, w, h) {
                p.v3stripes(c, w, h, '#008751', '#ffffff', '#008751');
            },
            ro: function(c, w, h) {
                p.v3stripes(c, w, h, '#002b7f', '#fcd116', '#ce1126');
            },
            am: function(c, w, h) {
                p.h3stripes(c, w, h, '#ff0000', '#0000d6', '#ffb100');
            },
            nl: function (c, w, h) {
                p.h3stripes(c, w, h, "#ff0000", '#FFFFFF', "#0000ff");
            },
            de: function (c, w, h) {
                p.h3stripes(c, w, h, "#000000", '#FF0000', "yellow");
            },
            uk: function (c, w, h) {
                p.britishDiagonalCross(c, w, h, "darkblue", 'white', "#a00");
                p.centeredCross(c, w, h, 'transparent', '#fff', '#a00');
            },
            ru: function(c, w, h) {
                p.h3stripes(c, w, h, '#ffffff', '#0000ff', '#ff0000');
            },
            jp: function(c, w, h) {
                p.centerCircles(c, w, h, '#ff0000');
            }
        },
        effects = {
            gradient: function(ctx, w, h, options) {
                ctx.globalAlpha = options.opacity || 0.2;
                var gradient = ctx.createLinearGradient(0,0,w,h);
                gradient.addColorStop(0, '#fff');
                gradient.addColorStop(1, '#000');
                ctx.fillStyle = gradient;
                ctx.fillRect(0,0,w,h);
                ctx.globalAlpha = 1;
            },
            border: function(ctx, w, h, options) {
                options = options || {};
                ctx.globalAlpha = options.opacity || 0.8;
                ctx.lineWidth = options.width || 1;
                ctx.strokeStyle = "#000";
                ctx.strokeRect(0,0,w,h);
                ctx.globalAlpha = 1;
            },
            light: function(ctx, w, h, options) {
                options = options || {};
                ctx.globalAlpha = options.opacity || 0.6;
                ctx.lineWidth = options.width || 1;
                ctx.strokeStyle = "#fff";
                ctx.strokeRect(0,1,w,h);
                ctx.globalAlpha = 1;
            }
        },
        publicMethods = {
            create: function(elm, options) {
                var width = options.width || elm.clientWidth  || 16,
                    height = options.height || elm.clientHeight  || 16,
                    canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    o = null;
    
                canvas.width = width;
                canvas.height = height;
                country[h.getAttribute(elm, 'data-country')](ctx, width, height);
                for (o in options) {
                    if (effects[o]) {
                        effects[o](ctx, width, height, options[o]);
                    }
                }
                if (elm.hasChildNodes()) { 
                    while (elm.childNodes.length >= 1 ) {
                        elm.removeChild(elm.firstChild);
                    }
                }
                elm.appendChild(canvas);
                return true;
            }
        };
    init.start();
};

h = { 
    getByClass: (function() {
        if (document.getElementsByClassName) {
            return function(searchClass,node,single) {
                if (single) {
                    return node.getElementsByClassName(searchClass)[0];
                } else {
                    return node.getElementsByClassName(searchClass);
                }
            };
        } else {
            return function(searchClass,node,single) {
                var classElements = [],
                    tag = '*',
                    els = null,
                    elsLen = 0,
                    pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
                
                if (node === null) {
                    node = document;
                }
                
                els = node.getElementsByTagName(tag);
                elsLen = els.length;
                
                for (var i = 0, j = 0; i < elsLen; i++) {
                    if ( pattern.test(els[i].className) ) {
                        if (single) {
                            return els[i];
                        } else {
                            classElements[j] = els[i];
                            j++;
                        }
                    }
                }
                return classElements;
            };
        }
    })(),
    /* (elm, attribute) Source: http://stackoverflow.com/questions/3755227/cross-browser-javascript-getattribute-method */
    getAttribute: function(ele, attr) {
        var result = (ele.getAttribute && ele.getAttribute(attr)) || null;
        if( !result ) {
            var attrs = ele.attributes;
            var length = attrs.length;
            for(var i = 0; i < length; i++) {
                if (attr[i] !== undefined) {
                    if(attr[i].nodeName === attr) {
                        result = attr[i].nodeValue;
                    }
                }
            }
        }
        return result;
    }
};

})(window);
