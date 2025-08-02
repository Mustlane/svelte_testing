<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<table
	cellpadding="6"
	cellspacing="1"
	border="0"
	width="100%"
	class="layout border user_options"
	id="navigation_settings"
>
	<tbody>
        <tr class="colhead_dark">
			<td colspan="2">
				<a href="#navigation"><strong>Navigation Settings</strong></a>
			</td>
		</tr>
		<tr>
			<td class="label">
				<strong>Navigation elements</strong>
			</td>
			<td
				>Select the navigation elements you wish to display at the right of the header.<br />
				<div>
					<input type="checkbox" id="n_1" name="n_1" />
					<label for="n_1">Posts</label>
				</div>
			</td>
		</tr>
	</tbody>
</table>


<style lang="scss">
	@use '$lib/css/variables' as variables;
	@use 'sass:color';


</style>