<script lang="ts">
</script>
<form action="?/submit" method="POST" enctype="multipart/form-data">

	<label class="label" for="post-content">
		<span>Textarea</span>
		<textarea id="post-content" name="post-content" class="textarea" rows="4" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
	</label>

	<label for="post-image">
	    <span>Post Image</span>
		<input class="input" type="file" id="post-image" name="post-image" required />
	</label>

	<button type="submit">Save</button>
</form>
