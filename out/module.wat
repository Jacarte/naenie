(module 
	
	;;ascii[lengthProperty]%64 - 56
	
	;;Subtree size 7
	
	(func $Jiouepieeo (param  i32) (result i32) 
		
		;;ascii[lengthProperty]
		get_local 0
		i32.const 64
		i32.rem_s
		i32.const 56
		i32.sub
		
	)
	(export "Jiouepieeo" (func $Jiouepieeo))
	;;i < ascii[lengthProperty]
	
	;;Subtree size 5
	
	(func $Seeaicitusn (param  i32) (param  i32) (result i32) 
		
		;;i
		get_local 0
		
		;;ascii[lengthProperty]
		get_local 1
		i32.lt_u
		
	)
	(export "Seeaicitusn" (func $Seeaicitusn))
	;;j < words[lengthProperty]
	
	;;Subtree size 5
	
	(func $Xugiiyagif (param  i32) (param  i32) (result i32) 
		
		;;j
		get_local 0
		
		;;words[lengthProperty]
		get_local 1
		i32.lt_u
		
	)
	(export "Xugiiyagif" (func $Xugiiyagif))
	;;ascii[lengthProperty]*8
	
	;;Subtree size 5
	
	(func $Bogiugusvoe (param  i32) (result i32) 
		
		;;ascii[lengthProperty]
		get_local 0
		i32.const 8
		i32.mul
		
	)
	(export "Bogiugusvoe" (func $Bogiugusvoe))
	;;(asciiBitLength/maxWord)|0
	
	;;Subtree size 5
	
	(func $Xeuuizaoui (param  i32) (param  i32) (result i32) 
		
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
	(export "Xeuuizaoui" (func $Xeuuizaoui))
	;;(value>>>amount) | (value<<(32 - amount))
	
	;;Subtree size 9
	
	(func $Zauoralaci (param  i32) (param  i32) (result i32) 
		
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
	(export "Zauoralaci" (func $Zauoralaci))
	;;j << ((3 - i)%4)*8
	
	;;Subtree size 9
	
	(func $Hioaveagai (param  i32) (param  i32) (result i32) 
		
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
	(export "Hioaveagai" (func $Hioaveagai))
	;;(mathPow(candidate, .5)*maxWord)|0
	
	;;Subtree size 8
	
	(func $Aaahuikreov (param  f32) (param  i32) (result i32) 
		
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
	(export "Aaahuikreov" (func $Aaahuikreov))
	;;(mathPow(candidate, 1/3)*maxWord)|0
	
	;;Subtree size 10
	
	(func $Uouoizaruu (param  f32) (param  i32) (result i32) 
		
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
	(export "Uouoizaruu" (func $Uouoizaruu))
	;;(hash[4] + temp1)|0
	
	;;Subtree size 7
	
	(func $Quvuoouroa (param  i32) (param  i32) (result i32) 
		
		;;hash[4]
		get_local 0
		
		;;temp1
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Quvuoouroa" (func $Quvuoouroa))
	;;(hash[i] + oldHash[i])|0
	
	;;Subtree size 9
	
	(func $Slaiicroxiii (param  i32) (param  i32) (result i32) 
		
		;;hash[i]
		get_local 0
		
		;;oldHash[i]
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Slaiicroxiii" (func $Slaiicroxiii))
	;;(hash[i]>>(j*8))&255
	
	;;Subtree size 9
	
	(func $Ueasmaoeslue (param  i32) (param  i32) (result i32) 
		
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
	(export "Ueasmaoeslue" (func $Ueasmaoeslue))
	;;(temp1 + temp2)|0
	
	;;Subtree size 5
	
	(func $Jozedroprouu (param  i32) (param  i32) (result i32) 
		
		;;temp1
		get_local 0
		
		;;temp2
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Jozedroprouu" (func $Jozedroprouu))
)