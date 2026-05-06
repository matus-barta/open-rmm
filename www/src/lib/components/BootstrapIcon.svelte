<script>
	import { cn } from '$lib/utils';
	import 'bootstrap-icons/font/bootstrap-icons.css';

	let { name, class: className = '', size = '', ...restProps } = $props();
</script>

<i class={cn(`bi bi-${name}`, 'inline-block align-middle', size, className)} {...restProps}> </i>
