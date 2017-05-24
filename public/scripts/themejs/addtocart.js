/* -------------------------------------------------------------------------------- /
	
	Magentech jQuery
	Created by Magentech
	v1.0 - 20.9.2016
	All rights reserved.
	
/ -------------------------------------------------------------------------------- */


	// Cart add remove functions
	var cart = {
		'add': function(product_id, quantity) {
			addProductNotice('添加成功',  '<h3>添加成功</h3>', '成功');
		}
	}

	var wishlist = {
		'add': function(product_id) {
			addProductNotice('', '<h3>收藏成功</h3>', '');
		}
	}
	var compare = {
		'add': function(product_id) {
			addProductNotice('和其他商品对比', '<img src="../imgs/books/book9.jpg" alt="">', '<h3><a href="#">我喜欢生命本来的样子</a>已加入商品对比</h3>', '成功');
		}
	}

	/* ---------------------------------------------------
		jGrowl – jQuery alerts and message box
	-------------------------------------------------- */
	function addProductNotice(title, thumb, text, type) {
		$.jGrowl.defaults.closer = false;
		//Stop jGrowl
		//$.jGrowl.defaults.sticky = true;
		var tpl = thumb + '<h3>'+text+'</h3>';
		$.jGrowl(tpl, {		
			life: 4000,
			header: title,
			speed: 'slow',
			theme: type
		});
	}

