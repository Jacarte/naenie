(module 
	
	;;w[i - 16] + s0 + w[i - 7] + s1
	
	;;Subtree size 15
	
	(func $Faluflaoxikn (param  i64) (param  i32) (param  i64) (param  i32) (result i64) 
		
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
	(export "Faluflaoxikn" (func $Faluflaoxikn))
	;;rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)
	
	;;Subtree size 14
	
	(func $Nouapleaooe (param  i32) (param  i32) (param  i32) (result i32) 
		
		;;rotr(e, 6)
		get_local 0
		
		;;rotr(e, 11)
		get_local 1
		i32.xor
		
		;;rotr(e, 25)
		get_local 2
		i32.xor
		
	)
	(export "Nouapleaooe" (func $Nouapleaooe))
	;;h + S1 + ch + k[i] + w[i] | 0
	
	;;Subtree size 15
	
	(func $Baaapleaeli (param  i32) (param  i32) (param  i32) (param  i32) (param  i64) (result i32) 
		
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
	(export "Baaapleaeli" (func $Baaapleaeli))
	;;rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)
	
	;;Subtree size 14
	
	(func $Cieuauoeee (param  i32) (param  i32) (param  i32) (result i32) 
		
		;;rotr(a, 2)
		get_local 0
		
		;;rotr(a, 13)
		get_local 1
		i32.xor
		
		;;rotr(a, 22)
		get_local 2
		i32.xor
		
	)
	(export "Cieuauoeee" (func $Cieuauoeee))
	;;a & b ^ a & c ^ b & c
	
	;;Subtree size 11
	
	(func $Eiikokuuai (param  i32) (param  i32) (param  i32) (result i32) 
		
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
	(export "Eiikokuuai" (func $Eiikokuuai))
)