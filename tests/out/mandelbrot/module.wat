(module 
	
	;;(2.0 * y / size) - 1.0
	
	;;Subtree size 7
	
	(func $Skeatsiiehogw (param  i32) (param  i32) (result f32) 
		i32.const 2
		
		;;y
		get_local 0
		i32.mul
		f32.convert_s/i32
		
		;;size
		get_local 1
		f32.convert_s/i32
		f32.div
		i32.const 1
		f32.convert_s/i32
		f32.sub
		
	)
	(export "Skeatsiiehogw" (func $Skeatsiiehogw))
	;;(2.0 * x / size) - 1.5
	
	;;Subtree size 7
	
	(func $Uigouaknufe (param  i32) (param  i32) (result f32) 
		i32.const 2
		
		;;x
		get_local 0
		i32.mul
		f32.convert_s/i32
		
		;;size
		get_local 1
		f32.convert_s/i32
		f32.div
		f32.const 1.5
		f32.sub
		
	)
	(export "Uigouaknufe" (func $Uigouaknufe))
	;;(byte_acc << 1) | escape
	
	;;Subtree size 5
	
	(func $Meoeuoofoa (param  i32) (param  i32) (result i32) 
		
		;;byte_acc
		get_local 0
		i32.const 1
		i32.shl
		
		;;escape
		get_local 1
		i32.or
		
	)
	(export "Meoeuoofoa" (func $Meoeuoofoa))
	;;x == size - 1
	
	;;Subtree size 5
	
	(func $Teieeqawee (param  i32) (param  i32) (result i32) 
		
		;;x
		get_local 0
		
		;;size
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Teieeqawee" (func $Teieeqawee))
	;;zrzr + zizi > 4.0
	
	;;Subtree size 5
	
	(func $Tsiaakaosii (param  f32) (param  f32) (result i32) 
		
		;;zrzr
		get_local 0
		
		;;zizi
		get_local 1
		f32.add
		i32.trunc_s/f32
		i32.const 4
		i32.gt_u
		
	)
	(export "Tsiaakaosii" (func $Tsiaakaosii))
	;;zrzr - zizi + cr
	
	;;Subtree size 5
	
	(func $Weaeuasliou (param  f32) (param  f32) (param  f32) (result f32) 
		
		;;zrzr
		get_local 0
		
		;;zizi
		get_local 1
		f32.sub
		
		;;cr
		get_local 2
		f32.add
		
	)
	(export "Weaeuasliou" (func $Weaeuasliou))
	;;2.0 * zr * zi + ci
	
	;;Subtree size 7
	
	(func $Reeioigooi (param  f32) (param  f32) (param  f32) (result f32) 
		i32.const 2
		f32.convert_s/i32
		
		;;zr
		get_local 0
		f32.mul
		
		;;zi
		get_local 1
		f32.mul
		
		;;ci
		get_local 2
		f32.add
		
	)
	(export "Reeioigooi" (func $Reeioigooi))
)