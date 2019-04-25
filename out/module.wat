(module 
	
	;;w >>> r | w << 32 - r
	
	;;Subtree size 9
	
	(func $Uiueeliplii (param  i64) (param  i32) (result i32) 
		
		;;w
		get_local 0
		i32.wrap_i64
		
		;;r
		get_local 1
		i32.shr_u
		
		;;w
		get_local 0
		i32.wrap_i64
		i32.const 32
		
		;;r
		get_local 1
		i32.sub
		i32.shl
		i32.or
		
	)
	(export "Uiueeliplii" (func $Uiueeliplii))
	;;i < 16 && l < bytes.length
	
	;;Subtree size 9
	
	(func $Oiexuuekriv (param  i32) (param  i32) (param  i32) (result i32) 
		
		;;i
		get_local 0
		i32.const 16
		i32.lt_u
		
		;;l
		get_local 1
		
		;;bytes.length
		get_local 2
		i32.lt_u
		i32.and
		
	)
	(export "Oiexuuekriv" (func $Oiexuuekriv))
	;;H[0] + a | 0
	
	;;Subtree size 7
	
	(func $Iprehuadiud (param  i32) (param  i32) (result i32) 
		
		;;H[0]
		get_local 0
		
		;;a
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Iprehuadiud" (func $Iprehuadiud))
	;;H[1] + b | 0
	
	;;Subtree size 7
	
	(func $Aqoiegiusku (param  i32) (param  i32) (result i32) 
		
		;;H[1]
		get_local 0
		
		;;b
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Aqoiegiusku" (func $Aqoiegiusku))
	;;H[2] + c | 0
	
	;;Subtree size 7
	
	(func $Kouheaolao (param  i32) (param  i32) (result i32) 
		
		;;H[2]
		get_local 0
		
		;;c
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Kouheaolao" (func $Kouheaolao))
	;;H[3] + d | 0
	
	;;Subtree size 7
	
	(func $Whouaiicioo (param  i32) (param  i32) (result i32) 
		
		;;H[3]
		get_local 0
		
		;;d
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Whouaiicioo" (func $Whouaiicioo))
	;;H[4] + e | 0
	
	;;Subtree size 7
	
	(func $Kaxiiunipi (param  i32) (param  i32) (result i32) 
		
		;;H[4]
		get_local 0
		
		;;e
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Kaxiiunipi" (func $Kaxiiunipi))
	;;H[5] + f | 0
	
	;;Subtree size 7
	
	(func $Yeteeiaxiu (param  i32) (param  i32) (result i32) 
		
		;;H[5]
		get_local 0
		
		;;f
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Yeteeiaxiu" (func $Yeteeiaxiu))
	;;H[6] + g | 0
	
	;;Subtree size 7
	
	(func $Pooueiutaj (param  i32) (param  i32) (result i32) 
		
		;;H[6]
		get_local 0
		
		;;g
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Pooueiutaj" (func $Pooueiutaj))
	;;H[7] + h | 0
	
	;;Subtree size 7
	
	(func $Iboiiueuii (param  i32) (param  i32) (result i32) 
		
		;;H[7]
		get_local 0
		
		;;h
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Iboiiueuii" (func $Iboiiueuii))
	;;bits / Math.pow(2, 32)
	
	;;Subtree size 8
	
	(func $Kaeivezail (param  i32) (param  i64) (result f32) 
		
		;;bits
		get_local 0
		f32.convert_s/i32
		
		;;Math.pow(2, 32)
		get_local 1
		f32.convert_s/i64
		f32.div
		
	)
	(export "Kaeivezail" (func $Kaeivezail))
	;;w[i] << 8 | bytes[l]
	
	;;Subtree size 9
	
	(func $Oeoaotsiuia (param  i32) (param  i32) (result i32) 
		
		;;w[i]
		get_local 0
		i32.const 8
		i32.shl
		
		;;bytes[l]
		get_local 1
		i32.or
		
	)
	(export "Oeoaotsiuia" (func $Oeoaotsiuia))
	;;w[i] << 8 | 0x80
	
	;;Subtree size 7
	
	(func $Moiecriiaco (param  i32) (result i32) 
		
		;;w[i]
		get_local 0
		i32.const 8
		i32.shl
		i32.const 128
		i32.or
		
	)
	(export "Moiecriiaco" (func $Moiecriiaco))
	;;4 - l % 4 - 1
	
	;;Subtree size 7
	
	(func $Auuiueuaesv (param  i32) (result i32) 
		i32.const 4
		
		;;l
		get_local 0
		i32.const 4
		i32.rem_s
		i32.sub
		i32.const 1
		i32.sub
		
	)
	(export "Auuiueuaesv" (func $Auuiueuaesv))
	;;w[i - 16] + s0 + w[i - 7] + s1
	
	;;Subtree size 15
	
	(func $Ooioiuaoae (param  i64) (param  i32) (param  i64) (param  i32) (result i64) 
		
		;;w[i - 16]
		get_local 0
		
		;;s0
		get_local 1
		i64.extend_i32_s
		i64.add
		
		;;w[i - 7]
		get_local 2
		i64.add
		
		;;s1
		get_local 3
		i64.extend_i32_s
		i64.add
		
	)
	(export "Ooioiuaoae" (func $Ooioiuaoae))
	;;rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)
	
	;;Subtree size 14
	
	(func $Laauayaeya (param  i32) (param  i32) (param  i32) (result i32) 
		
		;;rotr(e, 6)
		get_local 0
		
		;;rotr(e, 11)
		get_local 1
		i32.xor
		
		;;rotr(e, 25)
		get_local 2
		i32.xor
		
	)
	(export "Laauayaeya" (func $Laauayaeya))
	;;e & f ^ ~e & g
	
	;;Subtree size 8
	
	(func $Aisiiejaua (param  i32) (param  i32) (param  i32) (param  i32) (result i32) 
		
		;;e
		get_local 0
		
		;;f
		get_local 1
		i32.and
		
		;;~e
		get_local 2
		
		;;g
		get_local 3
		i32.and
		i32.xor
		
	)
	(export "Aisiiejaua" (func $Aisiiejaua))
	;;h + S1 + ch + k[i] + w[i] | 0
	
	;;Subtree size 15
	
	(func $Raauikrioii (param  i32) (param  i32) (param  i32) (param  i32) (param  i64) (result i32) 
		
		;;h
		get_local 0
		
		;;S1
		get_local 1
		i32.add
		
		;;ch
		get_local 2
		i32.add
		i64.extend_i32_s
		
		;;k[i]
		get_local 3
		i64.extend_i32_s
		i64.add
		
		;;w[i]
		get_local 4
		i64.add
		i32.wrap_i64
		i32.const 0
		i32.or
		
	)
	(export "Raauikrioii" (func $Raauikrioii))
	;;rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)
	
	;;Subtree size 14
	
	(func $Moknisvujauu (param  i32) (param  i32) (param  i32) (result i32) 
		
		;;rotr(a, 2)
		get_local 0
		
		;;rotr(a, 13)
		get_local 1
		i32.xor
		
		;;rotr(a, 22)
		get_local 2
		i32.xor
		
	)
	(export "Moknisvujauu" (func $Moknisvujauu))
	;;a & b ^ a & c ^ b & c
	
	;;Subtree size 11
	
	(func $Koroiiroui (param  i32) (param  i32) (param  i32) (result i32) 
		
		;;a
		get_local 0
		
		;;b
		get_local 1
		i32.and
		
		;;a
		get_local 0
		
		;;c
		get_local 2
		i32.and
		i32.xor
		
		;;b
		get_local 1
		
		;;c
		get_local 2
		i32.and
		i32.xor
		
	)
	(export "Koroiiroui" (func $Koroiiroui))
	;;H[i] >>> j * 8 & 0xFF
	
	;;Subtree size 9
	
	(func $Pneaeouiplia (param  i32) (param  i32) (result i32) 
		
		;;H[i]
		get_local 0
		
		;;j
		get_local 1
		i32.const 8
		i32.mul
		i32.shr_u
		i32.const 255
		i32.and
		
	)
	(export "Pneaeouiplia" (func $Pneaeouiplia))
)