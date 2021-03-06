<snake>	
	<div class="snake__info">Длина змейки: {snake.length - 3}</div>	
	<div class="snake__wrap">
		<div
			class = {
				snake__item : true, 
				snake__item_s : snake.indexOf(i) != -1, 
				snake__item_s_head : snake.indexOf(i) == (snake.length-1),
				snake__item_f : i == food

			}
			each = { field, i in grid }>
		</div>			
	</div>			
	
	<script>
		this.fieldW = this.fieldH = 15,
		this.snake = [ 0,1,2 ],
		this.direction = 39, 
		this.food = 20,
		this.timerId,
		this.speed = 250;

		this.grid = new Array(this.fieldW * this.fieldH);

		step() {
			var newHead,
				currentHead =  this.snake[this.snake.length-1];

			switch(this.direction) {
				case 37: 
					newHead = ((currentHead - 1) % this.fieldW == (this.fieldW-1) || (currentHead - 1) == -1) ? currentHead + (this.fieldW-1) : currentHead - 1;
					break;
				case 38: 
					newHead = (( currentHead - this.fieldH) < 0) ? currentHead + ((this.fieldH-1)*this.fieldW) : currentHead - this.fieldH;
					break;
				case 39: 
					newHead = ((currentHead + 1) % this.fieldW == 0) ? currentHead - (this.fieldW-1) : currentHead + 1;
					break;
				case 40: 
					newHead = (( currentHead + this.fieldH) > (this.fieldH*this.fieldW)-1) ? currentHead - ((this.fieldH-1)*this.fieldW) : currentHead + this.fieldH;
					break;
			}
			
			if(this.snake.indexOf(newHead) != -1) {
				alert('вы проигралим :(');
				clearTimeout(this.timerId);
				return;
			} else if(newHead == this.food) {
				this.food = this.newFood(0, this.fieldW*this.fieldH-1);
			} else {
				this.snake.shift();
			}  
	
			this.snake.push(newHead);
			riot.update();
		}

		changeDirection(e) {
			this.direction = e.which;
		}	

		newFood(min, max) {
		  var exclude = this.snake.slice(),			
			  i = exclude.length + 1,
			  result;

		  exclude.push(this.food);
		  exclude = exclude.sort(function(a,b){return b-a}); 
		 
		  max = max + 1 - min - i; 
		  result = Math.floor(Math.random()*max) + min;
		  while(result >= exclude[--i]) result++;
		  
		  return result;
		}

		this.timerId = setInterval( this.step , this.speed);
		document.addEventListener("keydown", this.changeDirection);
	</script>
</snake>	