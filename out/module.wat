(module 
	
	;;typeof module !== 'undefined' && module != null
	
	;;Subtree size 8
	
	(func $Ayeodoiushe (param  i32) (param  i32) (result i32) 
		
		;;typeof module !== 'undefined'
		get_local 0
		
		;;module != null
		get_local 1
		i32.and
		
	)
	(export "Ayeodoiushe" (func $Ayeodoiushe))
	;;ii < uncompressed.length
	
	;;Subtree size 5
	
	(func $Showeaxaclap (param  i32) (param  i32) (result i32) 
		
		;;ii
		get_local 0
		
		;;uncompressed.length
		get_local 1
		i32.lt_u
		
	)
	(export "Showeaxaclap" (func $Showeaxaclap))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Luweoudoyi (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Luweoudoyi" (func $Luweoudoyi))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Dijuapnivue (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Dijuapnivue" (func $Dijuapnivue))
	;;(context_data_val << 1) | (value&1)
	
	;;Subtree size 7
	
	(func $Uiteuiespag (param  i32) (param  i32) (result i32) 
		
		;;context_data_val
		get_local 0
		i32.const 1
		i32.shl
		
		;;value
		get_local 1
		i32.const 1
		i32.and
		i32.or
		
	)
	(export "Uiteuiespag" (func $Uiteuiespag))
	;;context_w.charCodeAt(0)<256
	
	;;Subtree size 7
	
	(func $Spaaadeseuh (param  i32) (result i32) 
		
		;;context_w.charCodeAt(0)
		get_local 0
		i32.const 256
		i32.lt_u
		
	)
	(export "Spaaadeseuh" (func $Spaaadeseuh))
	;;context_w.charCodeAt(0)<256
	
	;;Subtree size 7
	
	(func $Taiifoaaoi (param  i32) (result i32) 
		
		;;context_w.charCodeAt(0)
		get_local 0
		i32.const 256
		i32.lt_u
		
	)
	(export "Taiifoaaoi" (func $Taiifoaaoi))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Loiaeasacu (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Loiaeasacu" (func $Loiaeasacu))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Ziuuuecono (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Ziuuuecono" (func $Ziuuuecono))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Ruevupneiui (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Ruevupneiui" (func $Ruevupneiui))
	;;(context_data_val << 1) | (value&1)
	
	;;Subtree size 7
	
	(func $Aucluseauke (param  i32) (param  i32) (result i32) 
		
		;;context_data_val
		get_local 0
		i32.const 1
		i32.shl
		
		;;value
		get_local 1
		i32.const 1
		i32.and
		i32.or
		
	)
	(export "Aucluseauke" (func $Aucluseauke))
	;;(context_data_val << 1) | (value&1)
	
	;;Subtree size 7
	
	(func $Eausiauieo (param  i32) (param  i32) (result i32) 
		
		;;context_data_val
		get_local 0
		i32.const 1
		i32.shl
		
		;;value
		get_local 1
		i32.const 1
		i32.and
		i32.or
		
	)
	(export "Eausiauieo" (func $Eausiauieo))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Saaeeokweea (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Saaeeokweea" (func $Saaeeokweea))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Joaaguemiu (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Joaaguemiu" (func $Joaaguemiu))
	;;(context_data_val << 1) | (value&1)
	
	;;Subtree size 7
	
	(func $Veieibeaxu (param  i32) (param  i32) (result i32) 
		
		;;context_data_val
		get_local 0
		i32.const 1
		i32.shl
		
		;;value
		get_local 1
		i32.const 1
		i32.and
		i32.or
		
	)
	(export "Veieibeaxu" (func $Veieibeaxu))
)