(module 
	
	;;origArray.length <= 1
	
	;;Subtree size 5
	
	(func $Haknioeuucru (param  i32) (result i32) 
		
		;;origArray.length
		get_local 0
		i32.const 1
		i32.le_u
		
	)
	(export "Haknioeuucru" (func $Haknioeuucru))
	;;origArray[i] <= pivot
	
	;;Subtree size 5
	
	(func $Xepliiebooi (param  i32) (param  f32) (result i32) 
		
		;;origArray[i]
		get_local 0
		
		;;pivot
		get_local 1
		i32.trunc_s/f32
		i32.le_u
		
	)
	(export "Xepliiebooi" (func $Xepliiebooi))
)