app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:
    /*html*/
    `
   <div class="product-display">
        
    <div class="product-container">
      <div class="product-image">
        <img :src="image" alt="image" />
      </div>

      <div class="product-info">
        <h1>{{ productName }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div class="color-circle"
          v-for="(variant, index) in variants" 
          :key="variant.id"
          :style="{ backgroundColor: variant.color }"
          @mouseover="updateProduct(index)"
          >
        </div> 

        <button class="button" v-on:click="addToCart" 
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
          >
        Add to cart
        </button>
      </div>
    </div>

    <review-list :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview" ></review-form>
  </div>
   `,
  data() {
    return {
      product: 'DVD',
      brand: 'Vue Harry Potter',
      selectedVariant: 0,
      details: ['CD', 'Box', 'Cover associated to the film'],
      variants: [
        {
          id: 2231,
          color: 'skyblue',
          image: './assets/images/HarryPotter1.jpg',
          quantity: 10
        },
        {
          id: 2232,
          color: 'blue',
          image: './assets/images/HarryPotter2.jpg',
          quantity: 8
        },
        {
          id: 2233,
          color: '#FFD700',
          image: './assets/images/HarryPotter3.jpg',
          quantity: 6
        },
        {
          id: 2234,
          color: 'grey',
          image: './assets/images/HarryPotter4.jpg',
          quantity: 3
        },
        {
          id: 2235,
          color: '#00BFFF',
          image: './assets/images/HarryPotter5.jpg',
          quantity: 2
        },
        {
          id: 2236,
          color: '#F0E68C',
          image: './assets/images/HarryPotter6.jpg',
          quantity: 1
        },
        {
          id: 2237,
          color: '#9ACD32',
          image: './assets/images/HarryPotter7(1).jpg',
          quantity: 0
        },
        {
          id: 2238,
          color: '#C0C0C0',
          image: './assets/images/HarryPotter7(2).jpg',
          quantity: 0
        }
      ],
      reviews: [],
      tabs: ['review-form', 'review-list'],
      activeTab: 'review-form'
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    productName() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2.99
    }
  }
})
