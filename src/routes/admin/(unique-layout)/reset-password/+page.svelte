<script lang="ts">
	export let form: HTMLFormElement;
</script>

<div class="h-full w-full flex flex-col justify-center items-center">
	<div class="container w-96">
		<form class="card form flex flex-col justify-center items-start gap-12 p-8" method="post">
			<div class="flex flex-col justify-center items-start w-full h-full gap-4">
				<label class="label">
					<span>New Password</span>
					<input
						value={form?.password ?? ''}
						class="input"
						name="password"
						id="password"
						title="password"
						type="password"
						required
					/>
				</label>

				<label class="label">
					<span>Confirm password</span>
					<input
						value={form?.confirmPassword ?? ''}
						id="confirmPassword"
						class="input"
						name="confirmPassword"
						title="confirmPassword"
						type="password"
						required
					/>
				</label>
			</div>
			{#if form?.error}
				<div class="w-full h-full flex justify-center items-center">
					<p class="text-red-500">
						<small>{form?.message ?? ''}</small>
					</p>
				</div>
			{/if}
			<div class="w-full h-full flex justify-end">
				<button type="submit" class="btn variant-filled">Submit</button>
			</div>
		</form>
	</div>
</div>

<style>
	label {
		@apply flex flex-col justify-center items-start w-full h-full;
	}
</style>
