<script lang="ts">
	export let form: HTMLFormElement;
	export let passwordSelection = '1';
</script>

<div class="w-full h-full flex flex-col justify-start items-center gap-4 pt-8 pl-32 pr-32">
	<div class="w-full">
		<h1 class="text-4xl font-bold mb-4">New User</h1>
	</div>
	<div class="container mx-auto">
		<form bind:this={form} class="flex flex-col gap-4" method="post">
			<label class="label">
				<span>Username</span>
				<input
					id="username"
					name="username"
					class="input"
					title="Input (text)"
					type="text"
					placeholder="Jane Doe"
					required
				/>
			</label>
			<label class="label">
				<span>Name</span>
				<input
					id="name"
					name="name"
					class="input"
					title="Input (text)"
					type="text"
					placeholder="input text"
					required
				/>
			</label>
			<label class="label">
				<span>Email</span>
				<input
					id="email"
					name="email"
					class="input"
					title="Input (email)"
					type="email"
					placeholder="john@example.com"
					autocomplete="email"
					required
				/>
			</label>
			<label class="label">
				<span>User Password Options:</span>
				<div class="space-y-2">
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							name="passwordSelection"
							value="1"
							bind:group={passwordSelection}
						/>
						<p>Auto-generate</p>
					</label>
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							name="passwordSelection"
							value="2"
							bind:group={passwordSelection}
						/>
						<p>Enter</p>
					</label>
				</div>
			</label>
			<label class="label">
				<span>Force user to change password on sign-in?</span>
				<div class="space-y-2">
					<label class="flex items-center space-x-2">
						<input name="changePassword" class="checkbox" type="checkbox" checked />
						<p>Force change</p>
					</label>
				</div>
			</label>
			{#if passwordSelection === '2'}
				<label class="label">
					<span>Password</span>
					<input
						name="password"
						class="input"
						title="Input (password)"
						type="password"
						placeholder="password"
						required={passwordSelection === '2'}
					/>
				</label>
			{/if}
			<label class="label">
				<span>User Type</span>
				<select name="userType" class="select">
					<option value="USER">user</option>
					<option value="ADMIN">admin</option>
				</select>
			</label>

			<label class="label">
				<span>Avatar</span>
				<input name="avatar" class="input" type="file" accept="image/png" />
			</label>
			<div class="flex justify-end">
				<button class="btn variant-filled" type="submit"> Submit </button>
			</div>
		</form>
	</div>
</div>
