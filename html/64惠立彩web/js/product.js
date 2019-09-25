﻿(function(b) {
	b.fn.etalage = function(a) {
		var d = b.extend({
			align: "left",
			thumb_image_width: 300,
			thumb_image_height: 400,
			source_image_width: 600,
			source_image_height: 600,
			zoom_area_width: 400,
			zoom_area_height: "justify",
			zoom_area_distance: 10,
			zoom_easing: true,
			click_to_zoom: false,
			zoom_element: "auto",
			show_descriptions: true,
			description_location: "bottom",
			description_opacity: 0.7,
			small_thumbs: 3,
			smallthumb_inactive_opacity: 0.4,
			smallthumb_hide_single: true,
			smallthumb_select_on_hover: false,
			smallthumbs_position: "bottom",
			magnifier_opacity: 0.5,
			magnifier_invert: true,
			show_icon: true,
			icon_offset: 20,
			hide_cursor: false,
			show_hint: true,
			hint_offset: 15,
			speed: 600,
			autoplay: true,
			autoplay_interval: 6000,
			keyboard: true,
			right_to_left: false,
			click_callback: function() {
				return true
			},
			change_callback: function() {
				return true
			}
		}, a);
		b.each(this, function() {
			var a0 = b(this);
			if(a0.is("ul") && a0.children("li").length && a0.find("img.etalage_source_image").length) {
				var i, co, b2, bO, bj, b9, bL, bm, ba, bu, bk = a0.attr("id"),
					bz = Math.floor(d.speed * 0.7),
					bE = Math.round(d.speed / 100),
					a3 = false,
					cl = false,
					bJ = false,
					bf = true,
					cn = false,
					ch = 0,
					a9 = 0,
					a7 = 0,
					ci = 0,
					cg = 0,
					aY = "hori";
				if(typeof bk === "undefined" || !bk) {
					bk = "[no id]"
				}
				if(d.smallthumbs_position === "left" || d.smallthumbs_position === "right") {
					aY = "vert"
				}
				if(typeof b.browser === "object" && b.browser.msie) {
					if(b.browser.version < 9) {
						bf = false;
						if(b.browser.version < 7) {
							bJ = true
						}
					}
				}
				a0.addClass("etalage").show();
				var cf = a0.children("li").addClass("etalage_thumb");
				cf.first().show().addClass("etalage_thumb_active");
				var b3 = cf.length,
					a6 = d.autoplay;
				if(b3 < 2) {
					a6 = false
				}
				if(d.align === "right") {
					a0.addClass("etalage_right")
				}
				b.each(cf, function(f) {
					f += 1;
					var e = b(this),
						k = e.find(".etalage_thumb_image").removeAttr("alt").show(),
						h = e.find(".etalage_source_image"),
						g = e.find("a");
					e.data("id", f).addClass("thumb_" + f);
					if(!k.length && h.length) {
						e.prepend('<img class="etalage_thumb_image" src="' + h.attr("src") + '" />')
					} else {
						if(!k.length && !h.length) {
							e.remove()
						}
					}
					if(g.length) {
						e.find(".etalage_thumb_image").data("anchor", g.attr("href"))
					}
				});
				var br = cf.find(".etalage_thumb_image").css({
					width: d.thumb_image_width,
					height: d.thumb_image_height
				}).show();
				b.each(br, function() {
					b(this).data("src", this.src)
				});
				var bg = b('<li class="etalage_magnifier"><div><img /></div></li>').appendTo(a0),
					cm = bg.children("div"),
					bP = cm.children("img");
				var bI = b('<li class="etalage_icon">&nbsp;</li>').appendTo(a0);
				if(d.show_icon) {
					bI.show()
				}
				var b5;
				if(d.show_hint) {
					b5 = b('<li class="etalage_hint">&nbsp;</li>').appendTo(a0).show()
				}
				var bR, b7 = d.zoom_element;
				if(b7 !== "auto" && b7 && b(b7).length) {
					bR = b(b7).addClass("etalage_zoom_area").html('<div><img class="etalage_zoom_img" /></div>')
				} else {
					b7 = "auto";
					bR = b('<li class="etalage_zoom_area"><div><img class="etalage_zoom_img" /></div></li>').appendTo(a0)
				}
				var ce = bR.children("div"),
					bd;
				if(bf) {
					bd = b('<img class="etalage_zoom_preview" />').css({
						width: d.source_image_width,
						height: d.source_image_height,
						opacity: 0.3
					}).prependTo(ce).show()
				}
				var bD = ce.children(".etalage_zoom_img").css({
					width: d.source_image_width,
					height: d.source_image_height
				});
				var bA;
				if(d.show_descriptions) {
					bA = b().prependTo(bR)
				}
				var bi, bV, bs, cb, cj, a5 = d.small_thumbs;
				if(b3 > 1 || !d.smallthumb_hide_single) {
					bi = b('<li class="etalage_small_thumbs"><ul></ul></li>').appendTo(a0);
					bV = bi.children("ul");
					b.each(br, function() {
						var e = b(this);
						b2 = e.data("src");
						bO = e.parents(".etalage_thumb").data("id");
						b('<li><img class="etalage_small_thumb" src="' + b2 + '" /></li>').data("thumb_id", bO).appendTo(bV)
					});
					bs = bV.children("li").css({
						opacity: d.smallthumb_inactive_opacity
					});
					if(a5 < 3) {
						a5 = 3
					}
					if(b3 > a5) {
						b2 = br.eq(b3 - 1).data("src");
						bO = cf.eq(b3 - 1).data("id");
						b('<li class="etalage_smallthumb_first"><img class="etalage_small_thumb" src="' + b2 + '" /></li>').data("src", b2).data("thumb_id", bO).prependTo(bV).css({
							opacity: d.smallthumb_inactive_opacity
						});
						b2 = br.eq(0).data("src");
						bO = cf.eq(0).data("id");
						b('<li><img class="etalage_small_thumb" src="' + b2 + '" /></li>').data("src", b2).data("thumb_id", bO).appendTo(bV).css({
							opacity: d.smallthumb_inactive_opacity
						});
						bs = bV.children("li");
						bs.eq(a5 - 1).addClass("etalage_smallthumb_last");
						bs.eq(1).addClass("etalage_smallthumb_active").css({
							opacity: 1
						})
					} else {
						bs.eq(0).addClass("etalage_smallthumb_active").css({
							opacity: 1
						})
					}
					b.each(bs, function(e) {
						b(this).data("id", (e + 1))
					});
					cb = bs.children("img");
					cj = bs.length;
					if(aY === "vert") {
						bs.addClass("vertical")
					}
				}
				if(d.magnifier_invert) {
					bj = 1
				} else {
					bj = d.magnifier_opacity
				}
				var be = parseInt(cf.css("borderLeftWidth"), 10) + parseInt(cf.css("borderRightWidth"), 10) + parseInt(br.css("borderLeftWidth"), 10) + parseInt(br.css("borderRightWidth"), 10),
					ck = parseInt(cf.css("marginLeft"), 10) + parseInt(cf.css("marginRight"), 10),
					c = parseInt(cf.css("paddingLeft"), 10) + parseInt(cf.css("paddingRight"), 10) + parseInt(br.css("marginLeft"), 10) + parseInt(br.css("marginRight"), 10) + parseInt(br.css("paddingLeft"), 10) + parseInt(br.css("paddingRight"), 10),
					bW = d.thumb_image_width + be + ck + c,
					bY = d.thumb_image_height + be + ck + c,
					aA = 0,
					b0 = 0,
					bw = 0,
					aZ = 0,
					j = 0,
					bZ = 0,
					a2 = 0;
				if(b3 > 1 || !d.smallthumb_hide_single) {
					aA = parseInt(bs.css("borderLeftWidth"), 10) + parseInt(bs.css("borderRightWidth"), 10) + parseInt(cb.css("borderLeftWidth"), 10) + parseInt(cb.css("borderRightWidth"), 10);
					b0 = parseInt(bs.css("marginTop"), 10);
					bw = parseInt(bs.css("paddingLeft"), 10) + parseInt(bs.css("paddingRight"), 10) + parseInt(cb.css("marginLeft"), 10) + parseInt(cb.css("marginRight"), 10) + parseInt(cb.css("paddingLeft"), 10) + parseInt(cb.css("paddingRight"), 10);
					if(aY === "vert") {
						j = Math.round((bY - ((a5 - 1) * b0)) / a5) - (aA + bw);
						aZ = Math.round((d.thumb_image_width * j) / d.thumb_image_height);
						bZ = aZ + aA + bw;
						a2 = j + aA + bw
					} else {
						aZ = Math.round((bW - ((a5 - 1) * b0)) / a5) - (aA + bw);
						j = Math.round((d.thumb_image_height * aZ) / d.thumb_image_width);
						bZ = aZ + aA + bw;
						a2 = j + aA + bw
					}
				}
				var bH = parseInt(bR.css("borderTopWidth"), 10),
					bC = parseInt(d.zoom_area_distance),
					bQ = parseInt(bR.css("paddingTop"), 10),
					b8, bB;
				if((d.zoom_area_width - (bH * 2) - (bQ * 2)) > d.source_image_width) {
					b8 = d.source_image_width
				} else {
					b8 = d.zoom_area_width - (bH * 2) - (bQ * 2)
				}
				if(d.zoom_area_height === "justify") {
					bB = (bY + b0 + a2) - (bH * 2) - (bQ * 2)
				} else {
					bB = d.zoom_area_height - (bH * 2) - (bQ * 2)
				}
				if(bB > d.source_image_height) {
					bB = d.source_image_height
				}
				var bv, bn, cd, bl;
				if(d.show_descriptions) {
					bv = parseInt(bA.css("borderLeftWidth"), 10) + parseInt(bA.css("borderRightWidth"), 10);
					bn = parseInt(bA.css("marginLeft"), 10) + parseInt(bA.css("marginRight"), 10);
					cd = parseInt(bA.css("paddingLeft"), 10) + parseInt(bA.css("paddingRight"), 10);
					bl = b8 - bv - bn - cd
				}
				var bc;
				if(bJ) {
					bc = b('<iframe marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="javascript:\'<html></html>\'"></iframe>').css({
						position: "absolute",
						zIndex: 1
					}).prependTo(bR)
				}
				var b6 = parseInt(bg.css("borderTopWidth"), 10),
					a8 = parseInt(cf.css("borderTopWidth"), 10) + parseInt(cf.css("marginTop"), 10) + parseInt(cf.css("paddingTop"), 10) + parseInt(br.css("borderTopWidth"), 10) + parseInt(br.css("marginTop"), 10) - b6,
					bb = br.offset().left - a0.offset().left - b6;
				if(d.smallthumbs_position === "left") {
					bb = bb + bZ + b0
				}
				var cc = Math.round(b8 * (d.thumb_image_width / d.source_image_width)),
					b4 = Math.round(bB * (d.thumb_image_height / d.source_image_height)),
					bU = a8 + d.thumb_image_height - b4,
					b1 = bb + d.thumb_image_width - cc,
					aX = Math.round(cc / 2),
					aa = Math.round(b4 / 2),
					bM, bF;
				if(d.show_hint) {
					bM = parseInt(d.hint_offset, 10) + parseInt(b5.css("marginTop"), 10);
					bF = parseInt(d.hint_offset, 10) + parseInt(b5.css("marginRight"), 10);
					if(d.smallthumbs_position === "right") {
						bF = bF - bZ - b0
					}
				}
				if(aY === "vert") {
					bm = bW + b0 + bZ;
					a0.css({
						width: bm,
						height: bY
					})
				} else {
					bm = bW;
					a0.css({
						width: bm,
						height: bY + b0 + a2
					})
				}
				if(d.show_icon) {
					bu = {
						top: bY - bI.outerHeight(true) - parseInt(d.icon_offset, 10),
						left: parseInt(d.icon_offset, 10)
					};
					if(d.smallthumbs_position === "left") {
						bu.left = bZ + b0 + parseInt(d.icon_offset, 10)
					}
					bI.css(bu)
				}
				if(d.show_hint) {
					b5.css({
						margin: 0,
						top: -bM,
						right: -bF
					})
				}
				bP.css({
					margin: 0,
					padding: 0,
					width: d.thumb_image_width,
					height: d.thumb_image_height
				});
				cm.css({
					margin: 0,
					padding: 0,
					width: cc,
					height: b4
				});
				bg.css({
					margin: 0,
					padding: 0,
					left: (b1 - bb) / 2,
					top: (bU - a8) / 2
				}).hide();
				if(d.smallthumbs_position === "left") {
					bg.css({
						left: ((b1 - bb) / 2) + bZ + b0
					})
				}
				ce.css({
					width: b8,
					height: bB
				});
				if(d.align === "right" && b7 === "auto") {
					bR.css({
						left: -(b8 + (bH * 2) + (bQ * 2) + bC)
					})
				} else {
					if(b7 === "auto") {
						bR.css({
							left: bm + bC
						})
					}
				}
				bR.css({
					margin: 0
				}).css({
					opacity: 0
				}).hide();
				if(d.show_descriptions) {
					bu = {
						width: bl,
						bottom: bQ,
						left: bQ,
						opacity: d.description_opacity
					};
					if(d.description_location === "top") {
						bu.top = bQ;
						bu.bottom = "auto"
					}
					bA.css(bu).hide()
				}
				if(b3 > 1 || !d.smallthumb_hide_single) {
					if(aY === "vert") {
						if(d.smallthumbs_position === "left") {
							cf.css({
								left: bZ + b0
							})
						} else {
							bi.css({
								left: bW + b0
							})
						}
						bi.css({
							top: 0,
							height: bY
						});
						bV.css({
							height: (a2 * cj) + (cj * b0)
						});
						cb.css({
							width: aZ,
							height: j
						}).attr("height", j);
						bs.css({
							margin: 0,
							marginBottom: b0
						})
					} else {
						bi.css({
							top: bY + b0,
							width: bW
						});
						bV.css({
							width: (bZ * cj) + (cj * b0)
						});
						cb.css({
							width: aZ,
							height: j
						}).attr("width", aZ);
						bs.css({
							margin: 0,
							marginRight: b0
						})
					}
					if(aY === "vert") {
						ba = ((a2 * a5) + ((a5 - 1) * b0)) - bY
					} else {
						ba = ((bZ * a5) + ((a5 - 1) * b0)) - bW
					}
					if(ba > 0) {
						for(i = 1; i <= (cj - 1); i = i + (a5 - 1)) {
							co = 1;
							for(co; co <= ba; co += 1) {
								if(aY === "vert") {
									bs.eq(i + co - 1).css({
										marginBottom: (b0 - 1)
									})
								} else {
									bs.eq(i + co - 1).css({
										marginRight: (b0 - 1)
									})
								}
							}
						}
					} else {
						if(ba < 0) {
							for(i = 1; i <= (cj - 1); i = i + (a5 - 1)) {
								co = 1;
								for(co; co <= (-ba); co += 1) {
									if(aY === "vert") {
										bs.eq(i + co - 1).css({
											marginBottom: (b0 + 1)
										});
										bV.css({
											height: parseInt(bV.css("height"), 10) + 1
										})
									} else {
										bs.eq(i + co - 1).css({
											marginRight: (b0 + 1)
										});
										bV.css({
											width: parseInt(bV.css("width"), 10) + 1
										})
									}
								}
							}
						}
					}
				}
				if(d.show_icon && !d.magnifier_invert) {
					bg.css({
						background: bg.css("background-color") + " " + bI.css("background-image") + " center no-repeat"
					})
				}
				if(d.hide_cursor) {
					bg.add(bI).css({
						cursor: "none"
					})
				}
				if(bJ) {
					bc.css({
						width: ce.css("width"),
						height: ce.css("height")
					})
				}
				var by = cf.first().find(".etalage_thumb_image"),
					bh = cf.first().find(".etalage_source_image");
				if(d.magnifier_invert) {
					bP.attr("src", by.data("src")).show()
				}
				if(bf) {
					bd.attr("src", by.data("src"))
				}
				bD.attr("src", bh.attr("src"));
				if(d.show_descriptions) {
					bL = bh.attr("title");
					if(bL) {
						bA.html(bL).show()
					}
				}
				var bG = function() {
					if(b9) {
						clearInterval(b9);
						b9 = false
					}
				};
				var bT = function() {
					if(b9) {
						bG()
					}
					b9 = setInterval(function() {
						bp()
					}, d.autoplay_interval)
				};
				var ca = function() {
					bg.stop().fadeTo(bz, bj);
					bI.stop().animate({
						opacity: 0
					}, bz);
					bR.stop().show().animate({
						opacity: 1
					}, bz);
					if(d.magnifier_invert) {
						by.stop().animate({
							opacity: d.magnifier_opacity
						}, bz)
					}
					if(a6) {
						bG()
					}
				};
				var bt = function() {
					bg.stop().fadeOut(d.speed);
					bI.stop().animate({
						opacity: 1
					}, d.speed);
					bR.stop().animate({
						opacity: 0
					}, d.speed, function() {
						b(this).hide()
					});
					if(d.magnifier_invert) {
						by.stop().animate({
							opacity: 1
						}, d.speed, function() {
							if(d.click_to_zoom) {
								cn = false
							}
						})
					}
					clearTimeout(ch);
					if(a6) {
						bT()
					}
				};
				var bN = function(g, e) {
					var k, f, h = a0.find(".etalage_smallthumb_active").removeClass("etalage_smallthumb_active");
					g.addClass("etalage_smallthumb_active");
					bg.stop().hide();
					bR.stop().hide();
					if(!e) {
						a3 = true;
						h.stop(true, true).animate({
							opacity: d.smallthumb_inactive_opacity
						}, bz);
						g.stop(true, true).animate({
							opacity: 1
						}, bz, function() {
							a3 = false
						})
					}
					a0.find(".etalage_thumb_active").removeClass("etalage_thumb_active").stop().animate({
						opacity: 0
					}, d.speed, function() {
						b(this).hide()
					});
					k = cf.filter(".thumb_" + g.data("thumb_id")).addClass("etalage_thumb_active").show().stop().css({
						opacity: 0
					}).animate({
						opacity: 1
					}, d.speed);
					by = k.find(".etalage_thumb_image");
					bh = k.find(".etalage_source_image");
					if(d.magnifier_invert) {
						bP.attr("src", by.data("src"))
					}
					if(bf) {
						bd.attr("src", by.data("src"))
					}
					bD.attr("src", bh.attr("src"));
					if(d.show_descriptions) {
						bL = bh.attr("title");
						if(bL) {
							bA.html(bL).show()
						} else {
							bA.hide()
						}
					}
					if(a6) {
						bG();
						bT()
					}
					f = g.data("id");
					if(b3 >= a5) {
						f--
					}
					a1(f)
				};
				var bK = function(f, h, g, e) {
					b.each(bs, function() {
						var k = b(this),
							l = {
								opacity: d.smallthumb_inactive_opacity
							};
						if(k.data("id") === e.data("id")) {
							l.opacity = 1
						}
						if(aY === "vert") {
							l.top = "-=" + f
						} else {
							l.left = "-=" + f
						}
						k.animate(l, bz, "swing", function() {
							if(a3) {
								e.addClass("etalage_smallthumb_active");
								a3 = false
							}
						})
					});
					bN(e, true)
				};
				var bx = function() {
					var f = ci - a9,
						e = cg - a7,
						h = -f / bE,
						g = -e / bE;
					a9 = a9 - h;
					a7 = a7 - g;
					if(f < 1 && f > -1) {
						a9 = ci
					}
					if(e < 1 && e > -1) {
						a7 = cg
					}
					bD.css({
						left: a9,
						top: a7
					});
					if(bf) {
						bd.css({
							left: a9,
							top: a7
						})
					}
					if(f > 1 || e > 1 || f < 1 || e < 1) {
						ch = setTimeout(function() {
							bx()
						}, 25)
					}
				};
				var bS = function() {
					var e;
					if(d.magnifier_invert) {
						a0.find(".etalage_thumb_active").mouseleave()
					}
					if(!d.right_to_left) {
						e = a0.find(".etalage_smallthumb_active").prev();
						if(!e.length) {
							e = bs.last()
						}
					} else {
						e = a0.find(".etalage_smallthumb_active").next();
						if(!e.length) {
							e = bs.first()
						}
					}
					e.click()
				};
				var bp = function() {
					var e;
					if(d.magnifier_invert) {
						a0.find(".etalage_thumb_active").mouseleave()
					}
					if(!d.right_to_left) {
						e = a0.find(".etalage_smallthumb_active").next();
						if(!e.length) {
							e = bs.first()
						}
					} else {
						e = a0.find(".etalage_smallthumb_active").prev();
						if(!e.length) {
							e = bs.last()
						}
					}
					e.click()
				};
				var bX = function(l) {
					if(b3 <= a5) {
						l = l - 1
					}
					var g = bs.eq(l);
					if(g.length && !a3) {
						var f = a0.find(".etalage_smallthumb_active"),
							k = f.data("id") - 1,
							o;
						if(k > l) {
							cl = k - l;
							var m = a0.find(".etalage_smallthumb_first"),
								h = m.data("id");
							if(l < h) {
								o = k - h;
								cl = cl - o;
								m.click()
							} else {
								bN(g, false)
							}
						} else {
							if(k < l) {
								cl = l - k;
								var e = a0.find(".etalage_smallthumb_last"),
									n = e.data("id") - 1;
								if(l >= n) {
									o = n - k - 1;
									cl = cl - o;
									e.click()
								} else {
									bN(g, false)
								}
							}
						}
						cl = false
					}
				};
				window[bk + "_previous"] = function() {
					bS()
				};
				window[bk + "_next"] = function() {
					bp()
				};
				window[bk + "_show"] = function(e) {
					bX(e)
				};
				var a4 = function(e) {
					if(!d.click_callback(e, bk)) {
						return false
					}
					if(typeof etalage_click_callback === "function") {
						etalage_click_callback(e, bk);
						return false
					}
					return true
				};
				var a1 = function(e) {
					if(d.change_callback(e, bk)) {
						if(typeof etalage_change_callback === "function") {
							etalage_change_callback(e, bk)
						}
					}
				};
				cf.add(bg).add(bI).mouseenter(function() {
					if(d.show_hint) {
						b5.hide()
					}
					if(!d.click_to_zoom || cn) {
						ca()
					}
				}).mouseleave(function() {
					bt()
				});
				var bq = -(d.source_image_width - b8),
					bo = -(d.source_image_height - bB);
				cf.add(bg).add(bI).mousemove(function(f) {
					var m = Math.round(f.pageX - by.offset().left + bb),
						l = Math.round(f.pageY - by.offset().top + a8);
					var e = (m - aX),
						k = (l - aa);
					if(e < bb) {
						e = bb
					}
					if(e > b1) {
						e = b1
					}
					if(k < a8) {
						k = a8
					}
					if(k > bU) {
						k = bU
					}
					bg.css({
						left: e,
						top: k
					});
					if(d.magnifier_invert) {
						var h = e - bb,
							g = k - a8;
						bP.css({
							left: -h,
							top: -g
						})
					}
					ci = -((e - bb) * (1 / (d.thumb_image_width / d.source_image_width)));
					cg = -((k - a8) * (1 / (d.thumb_image_height / d.source_image_height)));
					if(ci < bq) {
						ci = bq
					}
					if(cg < bo) {
						cg = bo
					}
					if(d.zoom_easing) {
						clearTimeout(ch);
						bx()
					} else {
						if(bf) {
							bd.css({
								left: ci,
								top: cg
							})
						}
						bD.css({
							left: ci,
							top: cg
						})
					}
				});
				if(b3 > 1 || !d.smallthumb_hide_single) {
					a0.delegate(".etalage_smallthumb_first", "click", function() {
						if(!a3 || cl) {
							var h = b(this),
								l = 1,
								o = 0,
								e, k, f, g, n;
							if(cl) {
								l = cl
							}
							a3 = true;
							for(var m = 0; m < l; m += 1) {
								e = h.removeClass("etalage_smallthumb_first");
								k = a0.find(".etalage_smallthumb_last").removeClass("etalage_smallthumb_last");
								if(h.prev().length) {
									f = e.prev().addClass("etalage_smallthumb_first");
									g = k.prev().addClass("etalage_smallthumb_last");
									n = e
								} else {
									f = bs.eq(cj - a5).addClass("etalage_smallthumb_first");
									g = bs.eq(cj - 1).addClass("etalage_smallthumb_last");
									n = g.prev()
								}
								if(aY === "vert") {
									o = f.position().top
								} else {
									o = f.position().left
								}
								if(h.prev().length) {
									h = h.prev()
								}
							}
							bK(o, f, g, n)
						}
					});
					a0.delegate(".etalage_smallthumb_last", "click", function() {
						if(!a3 || cl) {
							var h = b(this),
								l = 1,
								o = 0,
								e, k, f, g, n;
							if(cl) {
								l = cl
							}
							a3 = true;
							for(var m = 0; m < l; m += 1) {
								e = a0.find(".etalage_smallthumb_first").removeClass("etalage_smallthumb_first");
								k = h.removeClass("etalage_smallthumb_last");
								if(h.next().length) {
									f = e.next().addClass("etalage_smallthumb_first");
									g = k.next().addClass("etalage_smallthumb_last");
									n = k
								} else {
									f = bs.eq(0).addClass("etalage_smallthumb_first");
									g = bs.eq(a5 - 1).addClass("etalage_smallthumb_last");
									n = f.next()
								}
								if(aY === "vert") {
									o = f.position().top
								} else {
									o = f.position().left
								}
								if(h.next().length) {
									h = h.next()
								}
							}
							bK(o, f, g, n)
						}
					});
					bs.click(function() {
						var e = b(this);
						if(!e.hasClass("etalage_smallthumb_first") && !e.hasClass("etalage_smallthumb_last") && !e.hasClass("etalage_smallthumb_active") && !a3) {
							bN(e, false)
						}
					});
					if(d.smallthumb_select_on_hover) {
						bs.mouseenter(function() {
							b(this).click()
						})
					}
				}
				if(d.click_to_zoom) {
					cf.click(function() {
						cn = true;
						ca()
					})
				} else {
					bg.click(function() {
						var e = by.data("anchor");
						if(e) {
							if(a4(e)) {
								window.location = e
							}
						}
					})
				}
				if(b3 > 1 && d.keyboard) {
					b(document).keydown(function(e) {
						if(e.keyCode === 39 || e.keyCode === "39") {
							if(!d.right_to_left) {
								bp()
							} else {
								bS()
							}
						}
						if(e.keyCode === 37 || e.keyCode === "37") {
							if(!d.right_to_left) {
								bS()
							} else {
								bp()
							}
						}
					})
				}
				b(window).bind("load", function() {
					cf.css({
						"background-image": "none"
					});
					bR.css({
						"background-image": "none"
					});
					if(bf) {
						bf = false;
						bd.remove()
					}
				});
				if(a6) {
					bT()
				}
			}
		});
		return this
	}
})(jQuery);
(function() {
	function h(c) {
		if(!c || typeof c != "object") {
			return c
		}
		var g = new c.constructor,
			i;
		for(i in c) {
			c.hasOwnProperty(i) && (g[i] = h(c[i]))
		}
		return g
	}

	function f(g, i) {
		if(g) {
			var l, k = 0,
				j = g.length;
			if(j === void 0) {
				for(l in g) {
					if(i.call(g[l], l, g[l]) === !1) {
						break
					}
				}
			} else {
				for(l = g[0]; k < j && i.call(l, k, l) !== !1; l = g[++k]) {}
			}
			return g
		}
	}

	function u(c, g, i) {
		if(typeof g != "object") {
			return c
		}
		c && g && f(g, function(k, j) {
			if(!i || typeof j != "function") {
				c[k] = j
			}
		});
		return c
	}

	function w(g) {
		var i = g.indexOf(".");
		if(i != -1) {
			var l = g.slice(0, i) || "*",
				k = g.slice(i + 1, g.length),
				j = [];
			f(document.getElementsByTagName(l), function() {
				this.className && this.className.indexOf(k) != -1 && j.push(this)
			});
			return j
		}
	}

	function e(b) {
		b = b || window.event;
		b.preventDefault ? (b.stopPropagation(), b.preventDefault()) : (b.returnValue = !1, b.cancelBubble = !0);
		return !1
	}

	function v(c, g, i) {
		c[g] = c[g] || [];
		c[g].push(i)
	}

	function x() {
		return "_" + ("" + Math.random()).slice(2, 10)
	}

	function p(b, t, i) {
		var g = this,
			l = null,
			n = !1,
			o, F, j = [],
			B = {},
			D = {},
			E, I, H, J, c, C;
		u(g, {
			id: function() {
				return E
			},
			isLoaded: function() {
				return l !== null && l.fp_play !== void 0 && !n
			},
			getParent: function() {
				return b
			},
			hide: function(k) {
				if(k) {
					b.style.height = "0px"
				}
				if(g.isLoaded()) {
					l.style.height = "0px"
				}
				return g
			},
			show: function() {
				b.style.height = C + "px";
				if(g.isLoaded()) {
					l.style.height = c + "px"
				}
				return g
			},
			isHidden: function() {
				return g.isLoaded() && parseInt(l.style.height, 10) === 0
			},
			load: function(k) {
				if(!g.isLoaded() && g._fireEvent("onBeforeLoad") !== !1) {
					var m = 0;
					f(d, function() {
						this.unload(function() {
							if(++m == d.length) {
								if((o = b.innerHTML) && !flashembed.isSupported(t.version)) {
									b.innerHTML = ""
								}
								if(k) {
									k.cached = !0, v(D, "onLoad", k)
								}
								flashembed(b, t, {
									config: i
								})
							}
						})
					})
				}
				return g
			},
			unload: function(k) {
				if(this.isFullscreen() && /WebKit/i.test(navigator.userAgent)) {
					return k && k(!1), g
				}
				if(o.replace(/\s/g, "") !== "") {
					if(g._fireEvent("onBeforeUnload") === !1) {
						return k && k(!1), g
					}
					n = !0;
					try {
						l && (l.fp_close(), g._fireEvent("onUnload"))
					} catch(m) {}
					setTimeout(function() {
						l = null;
						b.innerHTML = o;
						n = !1;
						k && k(!0)
					}, 50)
				} else {
					k && k(!1)
				}
				return g
			},
			getClip: function(k) {
				k === void 0 && (k = J);
				return j[k]
			},
			getCommonClip: function() {
				return F
			},
			getPlaylist: function() {
				return j
			},
			getPlugin: function(k) {
				var r = B[k];
				if(!r && g.isLoaded()) {
					var m = g._api().fp_getPlugin(k);
					m && (r = new a(k, m, g), B[k] = r)
				}
				return r
			},
			getScreen: function() {
				return g.getPlugin("screen")
			},
			getControls: function() {
				return g.getPlugin("controls")._fireEvent("onUpdate")
			},
			getLogo: function() {
				try {
					return g.getPlugin("logo")._fireEvent("onUpdate")
				} catch(k) {}
			},
			getPlay: function() {
				return g.getPlugin("play")._fireEvent("onUpdate")
			},
			getConfig: function(k) {
				return k ? h(i) : i
			},
			getFlashParams: function() {
				return t
			},
			loadPlugin: function(k, y, r, m) {
				typeof r == "function" && (m = r, r = {});
				var z = m ? x() : "_";
				g._api().fp_loadPlugin(k, y, r, z);
				y = {};
				y[z] = m;
				m = new a(k, null, g, y);
				return B[k] = m
			},
			getState: function() {
				return g.isLoaded() ? l.fp_getState() : -1
			},
			play: function(k, m) {
				var r = function() {
					k !== void 0 ? g._api().fp_play(k, m) : g._api().fp_play()
				};
				g.isLoaded() ? r() : n ? setTimeout(function() {
					g.play(k, m)
				}, 50) : g.load(function() {
					r()
				});
				return g
			},
			getVersion: function() {
				if(g.isLoaded()) {
					var k = l.fp_getVersion();
					k.push("flowplayer.js 3.2.6");
					return k
				}
				return "flowplayer.js 3.2.6"
			},
			_api: function() {
				if(!g.isLoaded()) {
					throw "Flowplayer " + g.id() + " not loaded when calling an API method"
				}
				return l
			},
			setClip: function(k) {
				g.setPlaylist([k]);
				return g
			},
			getIndex: function() {
				return H
			},
			_swfHeight: function() {
				return l.clientHeight
			}
		});
		f("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut".split(","), function() {
			var k = "on" + this;
			if(k.indexOf("*") != -1) {
				var k = k.slice(0, k.length - 1),
					m = "onBefore" + k.slice(2);
				g[m] = function(r) {
					v(D, m, r);
					return g
				}
			}
			g[k] = function(r) {
				v(D, k, r);
				return g
			}
		});
		f("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled".split(","), function() {
			var k = this;
			g[k] = function(m, y) {
				if(!g.isLoaded()) {
					return g
				}
				var r = null,
					r = m !== void 0 && y !== void 0 ? l["fp_" + k](m, y) : m === void 0 ? l["fp_" + k]() : l["fp_" + k](m);
				return r === "undefined" || r === void 0 ? g : r
			}
		});
		g._fireEvent = function(r) {
			typeof r == "string" && (r = [r]);
			var y = r[0],
				z = r[1],
				M = r[2],
				N = r[3],
				A = 0;
			i.debug && console.log("$f.fireEvent", [].slice.call(r));
			!g.isLoaded() && y == "onLoad" && z == "player" && (l = l || document.getElementById(I), c = g._swfHeight(), f(j, function() {
				this._fireEvent("onLoad")
			}), f(B, function(k, m) {
				m._fireEvent("onUpdate")
			}), F._fireEvent("onLoad"));
			if(!(y == "onLoad" && z != "player")) {
				if(y == "onError" && (typeof z == "string" || typeof z == "number" && typeof M == "number")) {
					z = M, M = N
				}
				if(y == "onContextMenu") {
					f(i.contextMenu[z], function(k, m) {
						m.call(g)
					})
				} else {
					if(y == "onPluginEvent" || y == "onBeforePluginEvent") {
						if(N = B[z.name || z]) {
							return N._fireEvent("onUpdate", z), N._fireEvent(M, r.slice(3))
						}
					} else {
						if(y == "onPlaylistReplace") {
							j = [];
							var K = 0;
							f(z, function() {
								j.push(new q(this, K++, g))
							})
						}
						if(y == "onClipAdd") {
							if(z.isInStream) {
								return
							}
							z = new q(z, M, g);
							j.splice(M, 0, z);
							for(A = M + 1; A < j.length; A++) {
								j[A].index++
							}
						}
						var L = !0;
						if(typeof z == "number" && z < j.length && (J = z, (r = j[z]) && (L = r._fireEvent(y, M, N)), !r || L !== !1)) {
							L = F._fireEvent(y, M, N, r)
						}
						f(D[y], function() {
							L = this.call(g, z, M);
							this.cached && D[y].splice(A, 1);
							if(L === !1) {
								return !1
							}
							A++
						});
						return L
					}
				}
			}
		};
		if(typeof b == "string") {
			var G = document.getElementById(b);
			if(!G) {
				throw "Flowplayer cannot access element: " + b
			}
			b = G
		}(function() {
			function m(k) {
				var y = g.hasiPadSupport && g.hasiPadSupport();
				if(/iPad|iPhone|iPod/i.test(navigator.userAgent) && !/.flv$/i.test(j[0].url) && !y) {
					return !0
				}!g.isLoaded() && g._fireEvent("onBeforeClick") !== !1 && g.load();
				return e(k)
			}
			$f(b) ? ($f(b).getParent().innerHTML = "", H = $f(b).getIndex(), d[H] = g) : (d.push(g), H = d.length - 1);
			C = parseInt(b.style.height, 10) || b.clientHeight;
			E = b.id || "fp" + x();
			I = t.id || E + "_api";
			t.id = I;
			i.playerId = E;
			typeof i == "string" && (i = {
				clip: {
					url: i
				}
			});
			if(typeof i.clip == "string") {
				i.clip = {
					url: i.clip
				}
			}
			i.clip = i.clip || {};
			if(b.getAttribute("href", 2) && !i.clip.url) {
				i.clip.url = b.getAttribute("href", 2)
			}
			F = new q(i.clip, -1, g);
			i.playlist = i.playlist || [i.clip];
			var r = 0;
			f(i.playlist, function() {
				var k = this;
				typeof k == "object" && k.length && (k = {
					url: "" + k
				});
				f(i.clip, function(y, z) {
					z !== void 0 && k[y] === void 0 && typeof z != "function" && (k[y] = z)
				});
				i.playlist[r] = k;
				k = new q(k, r, g);
				j.push(k);
				r++
			});
			f(i, function(k, y) {
				if(typeof y == "function") {
					if(F[k]) {
						F[k](y)
					} else {
						v(D, k, y)
					}
					delete i[k]
				}
			});
			f(i.plugins, function(k, y) {
				y && (B[k] = new a(k, y, g))
			});
			if(!i.plugins || i.plugins.controls === void 0) {
				B.controls = new a("controls", null, g)
			}
			B.canvas = new a("canvas", null, g);
			o = b.innerHTML;
			setTimeout(function() {
				o.replace(/\s/g, "") !== "" ? b.addEventListener ? b.addEventListener("click", m, !1) : b.attachEvent && b.attachEvent("onclick", m) : (b.addEventListener && b.addEventListener("click", e, !1), g.load())
			}, 0)
		})()
	}

	function s(b) {
		this.length = b.length;
		this.each = function(c) {
			f(b, c)
		};
		this.size = function() {
			return b.length
		}
	}
	var q = function(i, j, m) {
			var k = this,
				o = {},
				r = {};
			k.index = j;
			typeof i == "string" && (i = {
				url: i
			});
			u(this, i, !0);
			f("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop".split(","), function() {
				var b = "on" + this;
				if(b.indexOf("*") != -1) {
					var b = b.slice(0, b.length - 1),
						c = "onBefore" + b.slice(2);
					k[c] = function(g) {
						v(r, c, g);
						return k
					}
				}
				k[b] = function(g) {
					v(r, b, g);
					return k
				};
				j == -1 && (k[c] && (m[c] = k[c]), k[b] && (m[b] = k[b]))
			});
			u(this, {
				onCuepoint: function(b, c) {
					if(arguments.length == 1) {
						return o.embedded = [null, b], k
					}
					typeof b == "number" && (b = [b]);
					var g = x();
					o[g] = [b, c];
					m.isLoaded() && m._api().fp_addCuepoints(b, j, g);
					return k
				},
				update: function(b) {
					u(k, b);
					m.isLoaded() && m._api().fp_updateClip(b, j);
					var c = m.getConfig();
					u(j == -1 ? c.clip : c.playlist[j], b, !0)
				},
				_fireEvent: function(b, c, t, y) {
					if(b == "onLoad") {
						return f(o, function(g, A) {
							A[0] && m._api().fp_addCuepoints(A[0], j, g)
						}), !1
					}
					y = y || k;
					if(b == "onCuepoint") {
						var z = o[c];
						if(z) {
							return z[1].call(m, y, t)
						}
					}
					if(c && "onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(b) != -1 && (u(y, c), c.metaData)) {
						y.duration ? y.fullDuration = c.metaData.duration : y.duration = c.metaData.duration
					}
					var l = !0;
					f(r[b], function() {
						l = this.call(m, y, c, t)
					});
					return l
				}
			});
			if(i.onCuepoint) {
				var n = i.onCuepoint;
				k.onCuepoint.apply(k, typeof n == "function" ? [n] : n);
				delete i.onCuepoint
			}
			f(i, function(c, g) {
				typeof g == "function" && (v(r, c, g), delete i[c])
			});
			if(j == -1) {
				m.onCuepoint = this.onCuepoint
			}
		},
		a = function(i, j, k, m) {
			var o = this,
				n = {},
				r = !1;
			m && u(n, m);
			f(j, function(b, g) {
				typeof g == "function" && (n[b] = g, delete j[b])
			});
			u(this, {
				animate: function(b, c, t) {
					if(!b) {
						return o
					}
					typeof c == "function" && (t = c, c = 500);
					if(typeof b == "string") {
						var y = b,
							b = {};
						b[y] = c;
						c = 500
					}
					if(t) {
						var g = x();
						n[g] = t
					}
					c === void 0 && (c = 500);
					j = k._api().fp_animate(i, b, c, g);
					return o
				},
				css: function(b, c) {
					if(c !== void 0) {
						var g = {};
						g[b] = c;
						b = g
					}
					j = k._api().fp_css(i, b);
					u(o, j);
					return o
				},
				show: function() {
					this.display = "block";
					k._api().fp_showPlugin(i);
					return o
				},
				hide: function() {
					this.display = "none";
					k._api().fp_hidePlugin(i);
					return o
				},
				toggle: function() {
					this.display = k._api().fp_togglePlugin(i);
					return o
				},
				fadeTo: function(c, l, g) {
					typeof l == "function" && (g = l, l = 500);
					if(g) {
						var t = x();
						n[t] = g
					}
					this.display = k._api().fp_fadeTo(i, c, l, t);
					this.opacity = c;
					return o
				},
				fadeIn: function(c, g) {
					return o.fadeTo(1, c, g)
				},
				fadeOut: function(c, g) {
					return o.fadeTo(0, c, g)
				},
				getName: function() {
					return i
				},
				getPlayer: function() {
					return k
				},
				_fireEvent: function(c, l) {
					if(c == "onUpdate") {
						var g = k._api().fp_getPlugin(i);
						if(!g) {
							return
						}
						u(o, g);
						delete o.methods;
						r || (f(g.methods, function() {
							var t = "" + this;
							o[t] = function() {
								var b = [].slice.call(arguments),
									b = k._api().fp_invoke(i, t, b);
								return b === "undefined" || b === void 0 ? o : b
							}
						}), r = !0)
					}
					return(g = n[c]) ? (g = g.apply(o, l), c.slice(0, 1) == "_" && delete n[c], g) : o
				}
			})
		},
		d = [];
	window.flowplayer = window.$f = function() {
		var c = null,
			i = arguments[0];
		if(!arguments.length) {
			return f(d, function() {
				if(this.isLoaded()) {
					return c = this, !1
				}
			}), c || d[0]
		}
		if(arguments.length == 1) {
			if(typeof i == "number") {
				return d[i]
			} else {
				if(i == "*") {
					return new s(d)
				}
				f(d, function() {
					if(this.id() == i.id || this.id() == i || this.getParent() == i) {
						return c = this, !1
					}
				});
				return c
			}
		}
		if(arguments.length > 1) {
			var k = arguments[1],
				j = arguments.length == 3 ? arguments[2] : {};
			typeof k == "string" && (k = {
				src: k
			});
			k = u({
				bgcolor: "#000000",
				version: [9, 0],
				expressInstall: "http://static.flowplayer.org/swf/expressinstall.swf",
				cachebusting: !1
			}, k);
			if(typeof i == "string") {
				if(i.indexOf(".") != -1) {
					var m = [];
					f(w(i), function() {
						m.push(new p(this, h(k), h(j)))
					});
					return new s(m)
				} else {
					var l = document.getElementById(i);
					return new p(l !== null ? l : i, k, j)
				}
			} else {
				if(i) {
					return new p(i, k, j)
				}
			}
		}
		return null
	};
	u(window.$f, {
		fireEvent: function() {
			var c = [].slice.call(arguments),
				g = $f(c[0]);
			return g ? g._fireEvent(c.slice(1)) : null
		},
		addPlugin: function(c, g) {
			p.prototype[c] = g;
			return $f
		},
		each: f,
		extend: u
	});
	if(typeof jQuery == "function") {
		jQuery.fn.flowplayer = function(g, i) {
			if(!arguments.length || typeof arguments[0] == "number") {
				var j = [];
				this.each(function() {
					var b = $f(this);
					b && j.push(b)
				});
				return arguments.length ? j[arguments[0]] : new s(j)
			}
			return this.each(function() {
				$f(this, h(g), i ? h(i) : {})
			})
		}
	}
})();
(function() {
	function c() {
		if(e.done) {
			return !1
		}
		var g = document;
		if(g && g.getElementsByTagName && g.getElementById && g.body) {
			clearInterval(e.timer);
			e.timer = null;
			for(g = 0; g < e.ready.length; g++) {
				e.ready[g].call()
			}
			e.ready = null;
			e.done = !0
		}
	}

	function b(g, i) {
		if(i) {
			for(key in i) {
				i.hasOwnProperty(key) && (g[key] = i[key])
			}
		}
		return g
	}

	function h(i) {
		switch(q(i)) {
			case "string":
				return i = i.replace(RegExp('(["\\\\])', "g"), "\\$1"), i = i.replace(/^\s?(\d+)%/, "$1pct"), '"' + i + '"';
			case "array":
				return "[" + a(i, function(k) {
					return h(k)
				}).join(",") + "]";
			case "function":
				return '"function()"';
			case "object":
				var j = [],
					g;
				for(g in i) {
					i.hasOwnProperty(g) && j.push('"' + g + '":' + h(i[g]))
				}
				return "{" + j.join(",") + "}"
		}
		return String(i).replace(/\s/g, " ").replace(/\'/g, '"')
	}

	function q(g) {
		if(g === null || g === void 0) {
			return !1
		}
		var i = typeof g;
		return i == "object" && g.push ? "array" : i
	}

	function a(j, k) {
		var i = [],
			l;
		for(l in j) {
			j.hasOwnProperty(l) && (i[l] = k(j[l]))
		}
		return i
	}

	function p(j, k) {
		var i = b({}, j),
			n = document.all,
			m = '<object width="' + i.width + '" height="' + i.height + '"';
		if(n && !i.id) {
			i.id = "_" + ("" + Math.random()).substring(9)
		}
		i.id && (m += ' id="' + i.id + '"');
		i.cachebusting && (i.src += (i.src.indexOf("?") != -1 ? "&" : "?") + Math.random());
		m += i.w3c || !n ? ' data="' + i.src + '" type="application/x-shockwave-flash"' : ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
		m += ">";
		if(i.w3c || n) {
			m += '<param name="movie" value="' + i.src + '" />'
		}
		i.width = i.height = i.id = i.w3c = i.src = null;
		for(var l in i) {
			i[l] !== null && (m += '<param name="' + l + '" value="' + i[l] + '" />')
		}
		i = "";
		if(k) {
			for(var o in k) {
				k[o] !== null && (i += o + "=" + (typeof k[o] == "object" ? h(k[o]) : k[o]) + "&")
			}
			i = i.substring(0, i.length - 1);
			m += '<param name="flashvars" value=\'' + i + "' />"
		}
		m += "</object>";
		return m
	}

	function s(j, k, i) {
		var n = flashembed.getVersion();
		b(this, {
			getContainer: function() {
				return j
			},
			getConf: function() {
				return k
			},
			getVersion: function() {
				return n
			},
			getFlashvars: function() {
				return i
			},
			getApi: function() {
				return j.firstChild
			},
			getHTML: function() {
				return p(k, i)
			}
		});
		var m = k.version,
			l = k.expressInstall,
			o = !m || flashembed.isSupported(m);
		if(o) {
			k.onFail = k.version = k.expressInstall = null, j.innerHTML = p(k, i)
		} else {
			if(m && l && flashembed.isSupported([6, 65])) {
				b(k, {
					src: l
				}), i = {
					MMredirectURL: location.href,
					MMplayerType: "PlugIn",
					MMdoctitle: document.title
				}, j.innerHTML = p(k, i)
			} else {
				if(j.innerHTML.replace(/\s/g, "") === "" && (j.innerHTML = "<h2>Flash version " + m + " or greater is required</h2><h3>" + (n[0] > 0 ? "Your version is " + n : "You have no flash plugin installed") + "</h3>" + (j.tagName == "A" ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>"), j.tagName == "A")) {
					j.onclick = function() {
						location.href = "http://www.adobe.com/go/getflashplayer"
					}
				}
			}
		}
		if(!o && k.onFail && (m = k.onFail.call(this), typeof m == "string")) {
			j.innerHTML = m
		}
		document.all && (window[k.id] = document.getElementById(k.id))
	}
	var d = typeof jQuery == "function",
		f = {
			width: "100%",
			height: "100%",
			allowfullscreen: !0,
			allowscriptaccess: "always",
			quality: "high",
			version: null,
			onFail: null,
			expressInstall: null,
			w3c: !1,
			cachebusting: !1
		};
	if(d) {
		jQuery.tools = jQuery.tools || {}, jQuery.tools.flashembed = {
			version: "1.0.4",
			conf: f
		}
	}
	var e = d ? jQuery : function(g) {
		if(e.done) {
			return g()
		}
		e.timer ? e.ready.push(g) : (e.ready = [g], e.timer = setInterval(c, 13))
	};
	window.attachEvent && window.attachEvent("onbeforeunload", function() {
		__flash_unloadHandler = function() {};
		__flash_savedUnloadHandler = function() {}
	});
	window.flashembed = function(j, k, i) {
		if(typeof j == "string") {
			var l = document.getElementById(j);
			if(l) {
				j = l
			} else {
				e(function() {
					flashembed(j, k, i)
				});
				return
			}
		}
		if(j) {
			return typeof k == "string" && (k = {
				src: k
			}), l = b({}, f), b(l, k), new s(j, l, i)
		}
	};
	b(window.flashembed, {
		getVersion: function() {
			var j = [0, 0];
			if(navigator.plugins && typeof navigator.plugins["Shockwave Flash"] == "object") {
				var k = navigator.plugins["Shockwave Flash"].description;
				typeof k != "undefined" && (k = k.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), j = parseInt(k.replace(/^(.*)\..*$/, "$1"), 10), k = /r/.test(k) ? parseInt(k.replace(/^.*r(.*)$/, "$1"), 10) : 0, j = [j, k])
			} else {
				if(window.ActiveXObject) {
					try {
						k = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
					} catch(i) {
						try {
							k = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), j = [6, 0], k.AllowScriptAccess = "always"
						} catch(m) {
							if(j[0] == 6) {
								return j
							}
						}
						try {
							k = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
						} catch(l) {}
					}
					typeof k == "object" && (k = k.GetVariable("$version"), typeof k != "undefined" && (k = k.replace(/^\S+\s+(.*)$/, "$1").split(","), j = [parseInt(k[0], 10), parseInt(k[2], 10)]))
				}
			}
			return j
		},
		isSupported: function(g) {
			var i = flashembed.getVersion();
			return i[0] > g[0] || i[0] == g[0] && i[1] >= g[1]
		},
		domReady: e,
		asString: h,
		getHTML: p
	});
	if(d) {
		jQuery.fn.flashembed = function(i, j) {
			var g = null;
			this.each(function() {
				g = flashembed(this, i, j)
			});
			return i.api === !1 ? this : g
		}
	}
})();
(function() {
	function c() {
		if(!d && (d = !0, e)) {
			for(var i = 0; i < e.length; i++) {
				e[i].call(window, [])
			}
			e = []
		}
	}

	function b(j) {
		var i = window.onload;
		window.onload = typeof window.onload != "function" ? j : function() {
			i && i();
			j()
		}
	}

	function f() {
		if(!p) {
			p = !0;
			document.addEventListener && !h.opera && document.addEventListener("DOMContentLoaded", c, !1);
			h.msie && window == top && function() {
				if(!d) {
					try {
						document.documentElement.doScroll("left")
					} catch(g) {
						setTimeout(arguments.callee, 0);
						return
					}
					c()
				}
			}();
			h.opera && document.addEventListener("DOMContentLoaded", function() {
				if(!d) {
					for(var g = 0; g < document.styleSheets.length; g++) {
						if(document.styleSheets[g].disabled) {
							setTimeout(arguments.callee, 0);
							return
						}
					}
					c()
				}
			}, !1);
			if(h.safari) {
				var i;
				(function() {
					if(!d) {
						if(document.readyState != "loaded" && document.readyState != "complete") {
							setTimeout(arguments.callee, 0)
						} else {
							if(i === void 0) {
								for(var g = document.getElementsByTagName("link"), j = 0; j < g.length; j++) {
									g[j].getAttribute("rel") == "stylesheet" && i++
								}
								g = document.getElementsByTagName("style");
								i += g.length
							}
							document.styleSheets.length != i ? setTimeout(arguments.callee, 0) : c()
						}
					}
				})()
			}
			b(c)
		}
	}
	var l = window.DomReady = {},
		a = navigator.userAgent.toLowerCase(),
		h = {
			version: (a.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
			safari: /webkit/.test(a),
			opera: /opera/.test(a),
			msie: /msie/.test(a) && !/opera/.test(a),
			mozilla: /mozilla/.test(a) && !/(compatible|webkit)/.test(a)
		},
		p = !1,
		d = !1,
		e = [];
	l.ready = function(i) {
		f();
		d ? i.call(window, []) : e.push(function() {
			return i.call(window, [])
		})
	};
	f()
})();
(function(E, D) {
	function I(a, d) {
		return a.canPlayType(d) || f && d.search("mp4") > -1
	}

	function L(a) {
		for(var g = D.getElementsByTagName(a), i = [], j = 0; j < g.length; j++) {
			i.push(g[j])
		}
		for(j = 0; j < i.length; j++) {
			var g = i[j],
				n = !0;
			if(g.canPlayType) {
				if(g.src) {
					I(g, M(a, g.src)) && (n = !1)
				} else {
					for(var p = g.getElementsByTagName("source"), o = 0; o < p.length; o++) {
						var r = p[o];
						if(I(g, M(a, r.src, r.type))) {
							n = !1;
							break
						}
					}
				}
			}
			n || z.forceFallback(a, g) ? z.createFallback(a, g) : f && g.addEventListener("click", function() {
				this.play()
			}, !1)
		}
	}

	function z() {
		L("video");
		L("audio")
	}

	function J(b) {
		return b.split("/").slice(0, -1).join("/") + "/"
	}

	function M(d, e, g) {
		return g || s[d][e.split(".").slice(-1)[0]] || x[d]
	}

	function F(d, e) {
		var g = d.getAttribute(e);
		return g == !0 || typeof g == "string"
	}

	function H(b) {
		return b.substr(0, 1) == "/" ? w + b : b.substr(0, 1) == "." || !b.match(/^\s*\w+:\/\//) ? N + b : b
	}

	function G(e, g, h) {
		var i = e.getAttribute(g);
		if(i) {
			return i + "px"
		}
		if(e.currentStyle) {
			e = e.currentStyle[g]
		} else {
			if(E.getComputedStyle) {
				e = D.defaultView.getComputedStyle(e, null).getPropertyValue(g)
			} else {
				return h
			}
		}
		return e == "auto" ? h : e
	}

	function q(b) {
		return b.match(/\s*([\w-]+\/[\w-]+)(;|\s|$)/)[1]
	}

	function u(b, d) {
		return q(b) == q(d)
	}
	D.createElement("video").canPlayType || (D.createElement("audio"), D.createElement("source"));
	var f = E.navigator.userAgent.toLowerCase().match(/android 2\.[12]/) !== null,
		K = E.navigator.userAgent.toLowerCase().match(/opera/) !== null;
	z.forceFallback = function() {
		return !1
	};
	var y = function() {
		for(var d = D.getElementsByTagName("script"), e = 0; e < d.length; e++) {
			var g = d[e];
			if(g.src.match(/html5media(\.min|)\.js/)) {
				return J(g.src)
			}
		}
		return ""
	}();
	z.flowplayerSwf = y + "flowplayer.swf";
	z.flowplayerAudioSwf = y + "flowplayer.audio.swf";
	z.flowplayerControlsSwf = y + "flowplayer.controls.swf";
	var x = {
			video: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
			audio: "audio/mpeg;"
		},
		A = ['video/mp4; codecs="avc1.42E01E, mp4a.40.2"', "audio/x-m4a;", "audio/mpeg;"],
		s = {
			video: {
				ogg: 'video/ogg; codecs="theora, vorbis"',
				ogv: 'video/ogg; codecs="theora, vorbis"',
				avi: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				mp4: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				mkv: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				h264: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				264: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				avc: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				m4v: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				"3gp": 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				"3gpp": 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				"3g2": 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				mpg: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				mpeg: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				webm: "video/webm;"
			},
			audio: {
				ogg: 'audio/ogg; codecs="vorbis"',
				oga: 'audio/ogg; codecs="vorbis"',
				aac: "audio/x-m4a;",
				m4a: "audio/x-m4a;",
				mp3: "audio/mpeg;",
				wav: 'audio/wav; codecs="1"'
			}
		},
		w = E.location.protocol + "//" + E.location.host,
		N = String(E.location),
		N = J(function() {
			for(var d = D.getElementsByTagName("base"), e = 0; e < d.length; e++) {
				var g = d[0];
				if(g.href) {
					return g.href
				}
			}
			return String(E.location)
		}());
	z.configureFlowplayer = function(c, d) {
		return d
	};
	z.createFallback = function(c, g) {
		var h = F(g, "controls"),
			i = g.getAttribute("poster") || "",
			l = g.getAttribute("src") || "";
		if(!l) {
			for(var k = g.getElementsByTagName("source"), m = 0; m < k.length; m++) {
				var p = k[m],
					t = p.getAttribute("src");
				if(t) {
					for(var B = 0; B < A.length; B++) {
						if(u(A[B], M(c, t, p.getAttribute("type")))) {
							l = t;
							break
						}
					}
				}
				if(l) {
					break
				}
			}
		}
		if(l) {
			k = D.createElement("span");
			k.id = g.id;
			k.className = g.className;
			k.title = g.title;
			k.style.display = "block";
			k.style.width = G(g, "width", "300px");
			k.style.height = c == "audio" ? "26px" : G(g, "height", "200px");
			g.parentNode.replaceChild(k, g);
			p = (g.getAttribute("preload") || "").toLowerCase();
			m = [];
			i && m.push({
				url: H(i)
			});
			l && m.push({
				url: H(l),
				autoPlay: F(g, "autoplay"),
				autoBuffering: F(g, "autobuffer") || F(g, "preload") && (p == "" || p == "auto"),
				onBeforeFinish: function() {
					return !F(g, "loop")
				}
			});
			i = {
				controls: h && {
					url: H(z.flowplayerControlsSwf),
					opacity: 0.8,
					backgroundColor: "#181818",
					backgroundGradient: "none",
					fullscreen: c == "video",
					autoHide: c == "video" && {
						fullscreenOnly: !1,
						enabled: !0,
						hideStyle: "fade",
						mouseOutDelay: 0
					} || {
						enabled: !1
					}
				} || null
			};
			if(K && i.controls) {
				i.controls.autoHide.enabled = !1
			}
			if(c == "audio") {
				i.audio = {
					url: H(z.flowplayerAudioSwf)
				};
				if(!h) {
					i.controls = {
						url: H(z.flowplayerControlsSwf),
						display: "none"
					}, k.style.height = 0
				}
				m[m.length - 1].autoBuffering = !1
			}
			h = {
				play: null,
				playlist: m,
				clip: {
					scaling: "fit",
					fadeInSpeed: 0,
					fadeOutSpeed: 0
				},
				canvas: {
					backgroundGradient: "none",
					backgroundColor: "#000000"
				},
				plugins: i
			};
			h = z.configureFlowplayer(g, h);
			flowplayer(k, {
				src: H(z.flowplayerSwf),
				wmode: "opaque"
			}, h)
		}
	};
	DomReady.ready(z);
	E.html5media = z
})(this, document);