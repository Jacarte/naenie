(module 
	
	;;ii < uncompressed.length
	
	;;Subtree size 5
	
	(func $Upiouovapi (param  i32) (param  i32) (result i32) 
		
		;;ii
		get_local 0
		
		;;uncompressed.length
		get_local 1
		i32.lt_u
		
	)
	(export "Upiouovapi" (func $Upiouovapi))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Laoieiuhej (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Laoieiuhej" (func $Laoieiuhej))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Zivoeeiaeo (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Zivoeeiaeo" (func $Zivoeeiaeo))
	;;(context_data_val << 1) | (value&1)
	
	;;Subtree size 7
	
	(func $Yeiaoolawa (param  i32) (param  i32) (result i32) 
		
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
	(export "Yeiaoolawa" (func $Yeiaoolawa))
	;;context_w.charCodeAt(0)<256
	
	;;Subtree size 7
	
	(func $Niuiejoooe (param  i32) (result i32) 
		
		;;context_w.charCodeAt(0)
		get_local 0
		i32.const 256
		i32.lt_u
		
	)
	(export "Niuiejoooe" (func $Niuiejoooe))
	;;context_w.charCodeAt(0)<256
	
	;;Subtree size 7
	
	(func $Xaawhiyauuu (param  i32) (result i32) 
		
		;;context_w.charCodeAt(0)
		get_local 0
		i32.const 256
		i32.lt_u
		
	)
	(export "Xaawhiyauuu" (func $Xaawhiyauuu))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Krouueioixu (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Krouueioixu" (func $Krouueioixu))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Kuiaebiucla (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Kuiaebiucla" (func $Kuiaebiucla))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Baiiuazioz (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Baiiuazioz" (func $Baiiuazioz))
	;;(context_data_val << 1) | (value&1)
	
	;;Subtree size 7
	
	(func $Diieajopuf (param  i32) (param  i32) (result i32) 
		
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
	(export "Diieajopuf" (func $Diieajopuf))
	;;(context_data_val << 1) | (value&1)
	
	;;Subtree size 7
	
	(func $Seiuiyiaao (param  i32) (param  i32) (result i32) 
		
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
	(export "Seiuiyiaao" (func $Seiuiyiaao))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Liixoaeusi (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Liixoaeusi" (func $Liixoaeusi))
	;;context_data_position == bitsPerChar-1
	
	;;Subtree size 5
	
	(func $Kiblodunooo (param  i32) (param  i32) (result i32) 
		
		;;context_data_position
		get_local 0
		
		;;bitsPerChar
		get_local 1
		i32.const 1
		i32.sub
		i32.eq
		
	)
	(export "Kiblodunooo" (func $Kiblodunooo))
	;;(context_data_val << 1) | (value&1)
	
	;;Subtree size 7
	
	(func $Cuiispuoiie (param  i32) (param  i32) (result i32) 
		
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
	(export "Cuiispuoiie" (func $Cuiispuoiie))
)