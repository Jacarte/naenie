(module 
	
	;;2*32 + 2
	
	;;Subtree size 5
	
	(func $Saiueguplui (result i32) 
		i32.const 2
		i32.const 32
		i32.mul
		i32.const 2
		i32.add
		
	)
	(export "Saiueguplui" (func $Saiueguplui))
	;;2^5 < 23.3 == 12
	
	;;Subtree size 7
	
	(func $Vukoonoeae (result i32) 
		i32.const 2
		i32.const 5
		f32.const 23.3
		i32.trunc_s/f32
		i32.lt_u
		i32.const 12
		i32.eq
		i32.xor
		
	)
	(export "Vukoonoeae" (func $Vukoonoeae))
	;;a + b *129.45 - a + 100.5 + Math.random() + b + a
	
	;;Subtree size 18
	
	(func $Ixaaiuouij (param  i32) (param  i32) (param  f32) (result f32) 
		
		;;a
		get_local 0
		f32.convert_s/i32
		
		;;b
		get_local 1
		f32.convert_s/i32
		f32.const 129.45
		f32.mul
		f32.add
		
		;;a
		get_local 0
		f32.convert_s/i32
		f32.sub
		f32.const 100.5
		f32.add
		
		;;Math.random()
		get_local 2
		f32.add
		
		;;b
		get_local 1
		f32.convert_s/i32
		f32.add
		
		;;a
		get_local 0
		f32.convert_s/i32
		f32.add
		
	)
	(export "Ixaaiuouij" (func $Ixaaiuouij))
)