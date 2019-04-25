(module 
	
	;;(2.0 * y / size) - 1.0
	
	;;Subtree size 7
	
	(func $Swiaiuieoopl (param  i32) (param  i32) (result f32) 
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
	(export "Swiaiuieoopl" (func $Swiaiuieoopl))
	;;(2.0 * x / size) - 1.5
	
	;;Subtree size 7
	
	(func $Wuitiovuye (param  i32) (param  i32) (result f32) 
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
	(export "Wuitiovuye" (func $Wuitiovuye))
	;;2.0 * zr * zi + ci
	
	;;Subtree size 7
	
	(func $Tutuwhueuev (param  f32) (param  f32) (param  f32) (result f32) 
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
	(export "Tutuwhueuev" (func $Tutuwhueuev))
)