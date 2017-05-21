<template>
	<Row id="carousel">
        <Col :xs="{ span: 20, offset: 2 }" :md="{ span: 18, offset: 3 }" :lg="{ span: 16, offset: 4 }" >
        	<Carousel autoplay v-model="index">
		        <Carousel-item>
		            <div class="home-carousel">
		            	<img v-bind:src="'./static/img/home1.jpg'"/>
		            </div>
		        </Carousel-item>
		        <Carousel-item>
		            <div class="home-carousel">
		            	<img v-bind:src="'./static/img/home2.jpg'"/>
		            </div>
		        </Carousel-item>
		        <Carousel-item>
		            <div class="home-carousel">
		            	<img v-bind:src="'./static/img/home3.jpg'"/>
		            </div>
		        </Carousel-item>
		        <Carousel-item>
		            <div class="home-carousel">
		            	<img v-bind:src="'./static/img/home4.jpg'"/>
		            </div>
		        </Carousel-item>
    		</Carousel>
        </Col>
    </Row>
</template>

<script>
    export default {
        data () {
            return {
                index: 0
            }
        }
    }
</script>

<style>
	div.home-carousel{
		height: 500px;
	}
	div.home-carousel img{
		width: 100%;
		overflow: hidden;
	}
</style>

