(module 
	
	;;ascii[lengthProperty]%64 - 56
	
	;;Subtree size 7
	
	(func $Anedoxaicu (param  i32) (result i32) 
		
		;;ascii[lengthProperty]
		get_local 0
		i32.const 64
		i32.rem_s
		i32.const 56
		i32.sub
		
	)
	(export "Anedoxaicu" (func $Anedoxaicu))
	;;i < ascii[lengthProperty]
	
	;;Subtree size 5
	
	(func $Braepsaioiae (param  i32) (param  i32) (result i32) 
		
		;;i
		get_local 0
		
		;;ascii[lengthProperty]
		get_local 1
		i32.lt_u
		
	)
	(export "Braepsaioiae" (func $Braepsaioiae))
	;;j < words[lengthProperty]
	
	;;Subtree size 5
	
	(func $Sosuuyause (param  i32) (param  i32) (result i32) 
		
		;;j
		get_local 0
		
		;;words[lengthProperty]
		get_local 1
		i32.lt_u
		
	)
	(export "Sosuuyause" (func $Sosuuyause))
	;;ascii[lengthProperty]*8
	
	;;Subtree size 5
	
	(func $Abeuaizooe (param  i32) (result i32) 
		
		;;ascii[lengthProperty]
		get_local 0
		i32.const 8
		i32.mul
		
	)
	(export "Abeuaizooe" (func $Abeuaizooe))
	;;(asciiBitLength/maxWord)|0
	
	;;Subtree size 5
	
	(func $Rekaneumai (param  i32) (param  i32) (result i32) 
		
		;;asciiBitLength
		get_local 0
		f32.convert_s/i32
		
		;;maxWord
		get_local 1
		f32.convert_s/i32
		f32.div
		i32.trunc_s/f32
		i32.const 0
		i32.or
		
	)
	(export "Rekaneumai" (func $Rekaneumai))
	;;(value>>>amount) | (value<<(32 - amount))
	
	;;Subtree size 9
	
	(func $Houioxadoo (param  i32) (param  i32) (result i32) 
		
		;;value
		get_local 0
		
		;;amount
		get_local 1
		i32.shr_u
		
		;;value
		get_local 0
		i32.const 32
		
		;;amount
		get_local 1
		i32.sub
		i32.shl
		i32.or
		
	)
	(export "Houioxadoo" (func $Houioxadoo))
	;;j << ((3 - i)%4)*8
	
	;;Subtree size 9
	
	(func $Spauskuoawea (param  i32) (param  i32) (result i32) 
		
		;;j
		get_local 0
		i32.const 3
		
		;;i
		get_local 1
		i32.sub
		i32.const 4
		i32.rem_s
		i32.const 8
		i32.mul
		i32.shl
		
	)
	(export "Spauskuoawea" (func $Spauskuoawea))
	;;(mathPow(candidate, .5)*maxWord)|0
	
	;;Subtree size 8
	
	(func $Yoayaeuaoi (param  f32) (param  i32) (result i32) 
		
		;;mathPow(candidate, .5)
		get_local 0
		f64.promote_f32
		
		;;maxWord
		get_local 1
		f64.convert_s/i32
		f64.mul
		i32.trunc_s/f64
		i32.const 0
		i32.or
		
	)
	(export "Yoayaeuaoi" (func $Yoayaeuaoi))
	;;(mathPow(candidate, 1/3)*maxWord)|0
	
	;;Subtree size 10
	
	(func $Uuotioiiaa (param  f32) (param  i32) (result i32) 
		
		;;mathPow(candidate, 1/3)
		get_local 0
		f64.promote_f32
		
		;;maxWord
		get_local 1
		f64.convert_s/i32
		f64.mul
		i32.trunc_s/f64
		i32.const 0
		i32.or
		
	)
	(export "Uuotioiiaa" (func $Uuotioiiaa))
	;;hash[7] 				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1 				+ ((e&hash[5])^((~e)&hash[6])) // ch 				+ k[i] 				// Expand the message schedule if needed 				+ (w[i] = (i < 16) ? w[i] : ( 						w[i - 16] 						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0 						+ w[i - 7] 						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1 					)|0 				)
	
	;;Subtree size 88
	
	(func $Piialiuaev (param  i32) (param  i32) (param  i32) (param  i32) (param  i32) (param  i32) (param  i32) (param  i32) (param  i32) (param  i32) (result i32) 
		
		;;hash[7]
		get_local 0
		
		;;rightRotate(e, 6)
		get_local 1
		
		;;rightRotate(e, 11)
		get_local 2
		i32.xor
		
		;;rightRotate(e, 25)
		get_local 3
		i32.xor
		i32.add
		
		;;e
		get_local 4
		
		;;hash[5]
		get_local 5
		i32.and
		
		;;~e
		get_local 6
		
		;;hash[6]
		get_local 7
		i32.and
		i32.xor
		i32.add
		
		;;k[i]
		get_local 8
		i32.add
		
		;;w[i] = (i < 16) ? w[i] : ( 						w[i - 16] 						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0 						+ w[i - 7] 						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1 					)|0
		get_local 9
		i32.add
		
	)
	(export "Piialiuaev" (func $Piialiuaev))
	;;(rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0 				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]))
	
	;;Subtree size 34
	
	(func $Aaiuayokrud (param  i32) (param  i32) (param  i32) (param  i32) (param  i32) (param  i32) (result i32) 
		
		;;rightRotate(a, 2)
		get_local 0
		
		;;rightRotate(a, 13)
		get_local 1
		i32.xor
		
		;;rightRotate(a, 22)
		get_local 2
		i32.xor
		
		;;a
		get_local 3
		
		;;hash[1]
		get_local 4
		i32.and
		
		;;a
		get_local 3
		
		;;hash[2]
		get_local 5
		i32.and
		i32.xor
		
		;;hash[1]
		get_local 4
		
		;;hash[2]
		get_local 5
		i32.and
		i32.xor
		i32.add
		
	)
	(export "Aaiuayokrud" (func $Aaiuayokrud))
	;;(hash[4] + temp1)|0
	
	;;Subtree size 7
	
	(func $Eruiuuuswep (param  i32) (param  i32) (result i32) 
		
		;;hash[4]
		get_local 0
		
		;;temp1
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Eruiuuuswep" (func $Eruiuuuswep))
	;;(hash[i] + oldHash[i])|0
	
	;;Subtree size 9
	
	(func $Tuubroapoesh (param  i32) (param  i32) (result i32) 
		
		;;hash[i]
		get_local 0
		
		;;oldHash[i]
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Tuubroapoesh" (func $Tuubroapoesh))
	;;(hash[i]>>(j*8))&255
	
	;;Subtree size 9
	
	(func $Ayuliauaxo (param  i32) (param  i32) (result i32) 
		
		;;hash[i]
		get_local 0
		
		;;j
		get_local 1
		i32.const 8
		i32.mul
		i32.shr_u
		i32.const 255
		i32.and
		
	)
	(export "Ayuliauaxo" (func $Ayuliauaxo))
	;;(temp1 + temp2)|0
	
	;;Subtree size 5
	
	(func $Poegwaakatru (param  i32) (param  i32) (result i32) 
		
		;;temp1
		get_local 0
		
		;;temp2
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Poegwaakatru" (func $Poegwaakatru))
)