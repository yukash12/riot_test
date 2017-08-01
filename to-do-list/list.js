<list>	
	<style>
		.ready {
			color: #999;
			text-decoration: line-through; 
		}
	</style>

	<h1>{opts.title}</h1>
	
	<div hide = {tasks.length}>
		Заданий нет
	</div>	
	
	<div each={task, id in tasks}>
		<span 
			class = {ready: task.status}
			show = {task != current_task} 
			ondblclick = {edit}
			onclick = {toggle}>	
			{ task.title }

			<a href="#" onclick={remove} >Удалить</a>
		</span>	

		<input 
			onkeyup = {sync}
			show = { task == current_task } 
			value = {current_task ? current_task.title : ''} 
			type="text">
	</div>	

	<form onsubmit={create}>
		<input ref="new_item" type="text" disabled = { current_task.title }>
	</form>

	<script>
		this.current_task = null;
		this.tasks = [
			{title : 'первое задание', status: 0 },
			{title : 'второе задание', status: 0 },
			{title : 'третье задание', status: 0 }
		];	
		
		create(e) {
			e.preventDefault();
			this.tasks.push({ title: this.refs.new_item.value, status: 0});
			this.refs.new_item.value = '';
		}

		edit(e) {
			this.current_task = e.item.task;
		}

		sync(e) {
			if(e.which != 13) {
				return this.current_task.title = e.target.value;
			}
			this.current_task = null;
		}

		remove(e) {
			e.preventDefault();
			this.tasks.splice(e.item.i, 1);
		}
		
		toggle(e) {
			e.item.task.status = !e.item.task.status;
		}
	</script>
</list>	