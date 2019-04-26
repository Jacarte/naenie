(module 
	
	;;ascii[lengthProperty]%64 - 56
	
	;;Subtree size 7
	
	(func $Husuwhieeau (param  i32) (result i32) 
		
		;;ascii[lengthProperty]
		get_local 0
		i32.const 64
		i32.rem_s
		i32.const 56
		i32.sub
		
	)
	(export "Husuwhieeau" (func $Husuwhieeau))
	;;i < ascii[lengthProperty]
	
	;;Subtree size 5
	
	(func $Xetuonootso (param  i32) (param  i32) (result i32) 
		
		;;i
		get_local 0
		
		;;ascii[lengthProperty]
		get_local 1
		i32.lt_u
		
	)
	(export "Xetuonootso" (func $Xetuonootso))
	;;j < words[lengthProperty]
	
	;;Subtree size 5
	
	(func $Eauueixuuv (param  i32) (param  i32) (result i32) 
		
		;;j
		get_local 0
		
		;;words[lengthProperty]
		get_local 1
		i32.lt_u
		
	)
	(export "Eauueixuuv" (func $Eauueixuuv))
	;;ascii[lengthProperty]*8
	
	;;Subtree size 5
	
	(func $Uouoiinuoi (param  i32) (result i32) 
		
		;;ascii[lengthProperty]
		get_local 0
		i32.const 8
		i32.mul
		
	)
	(export "Uouoiinuoi" (func $Uouoiinuoi))
	;;(asciiBitLength/maxWord)|0
	
	;;Subtree size 5
	
	(func $Wemiiuploed (param  i32) (param  i32) (result i32) 
		
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
	(export "Wemiiuploed" (func $Wemiiuploed))
	;;(value>>>amount) | (value<<(32 - amount))
	
	;;Subtree size 9
	
	(func $Wikooewauu (param  i32) (param  i32) (result i32) 
		
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
	(export "Wikooewauu" (func $Wikooewauu))
	;;j << ((3 - i)%4)*8
	
	;;Subtree size 9
	
	(func $Zetueouuec (param  i32) (param  i32) (result i32) 
		
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
	(export "Zetueouuec" (func $Zetueouuec))
	;;(mathPow(candidate, .5)*maxWord)|0
	
	;;Subtree size 8
	
	(func $Abeaaeiudru (param  f32) (param  i32) (result i32) 
		
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
	(export "Abeaaeiudru" (func $Abeaaeiudru))
	;;(mathPow(candidate, 1/3)*maxWord)|0
	
	;;Subtree size 10
	
	(func $Pnuaupiiknotr (param  f32) (param  i32) (result i32) 
		
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
	(export "Pnuaupiiknotr" (func $Pnuaupiiknotr))
	;;(hash[4] + temp1)|0
	
	;;Subtree size 7
	
	(func $Snoveeuauua (param  i32) (param  i32) (result i32) 
		
		;;hash[4]
		get_local 0
		
		;;temp1
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Snoveeuauua" (func $Snoveeuauua))
	;;(hash[i] + oldHash[i])|0
	
	;;Subtree size 9
	
	(func $Vuouocroaro (param  i32) (param  i32) (result i32) 
		
		;;hash[i]
		get_local 0
		
		;;oldHash[i]
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Vuouocroaro" (func $Vuouocroaro))
	;;(hash[i]>>(j*8))&255
	
	;;Subtree size 9
	
	(func $Ojaaioeaec (param  i32) (param  i32) (result i32) 
		
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
	(export "Ojaaioeaec" (func $Ojaaioeaec))
	;;(temp1 + temp2)|0
	
	;;Subtree size 5
	
	(func $Uprajomaekna (param  i32) (param  i32) (result i32) 
		
		;;temp1
		get_local 0
		
		;;temp2
		get_local 1
		i32.add
		i32.const 0
		i32.or
		
	)
	(export "Uprajomaekna" (func $Uprajomaekna))
)