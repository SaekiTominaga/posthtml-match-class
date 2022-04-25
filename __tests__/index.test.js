import posthtml from 'posthtml';
import PosthtmlClass from '../dist/index.js';
import { describe, expect, test } from '@jest/globals';

describe('contains()', () => {
	const contains = () => {
		return (tree) => {
			tree.match({ tag: 'p' }, (node) => {
				const posthtmlClass = new PosthtmlClass(node);

				let text = 'contaign';

				if (!posthtmlClass.contains('foo')) {
					text = 'not contaign';
				}

				return {
					tag: 'p',
					attrs: undefined,
					content: [text],
				};
			});

			return tree;
		};
	};

	test('単一クラス・マッチ', async () => {
		expect((await posthtml([contains()]).process('<p class="foo"></p>')).html).toBe('<p>contaign</p>');
	});

	test('複数クラス・マッチ', async () => {
		expect(
			(
				await posthtml([contains()]).process(`<p class=" foo
				bar "></p>`)
			).html
		).toBe('<p>contaign</p>');
	});

	test('単一クラス・マッチせず', async () => {
		expect((await posthtml([contains()]).process('<p class="bar"></p>')).html).toBe('<p>not contaign</p>');
	});

	test('複数クラス・マッチせず', async () => {
		expect(
			(
				await posthtml([contains()]).process(`<p class=" bar
				baz "></p>`)
			).html
		).toBe('<p>not contaign</p>');
	});

	test('class属性なし', async () => {
		expect((await posthtml([contains()]).process('<p></p>')).html).toBe('<p>not contaign</p>');
	});
});

describe('refine()', () => {
	const refine = () => {
		return (tree) => {
			tree.match({ tag: 'p' }, (node) => {
				const posthtmlClass = new PosthtmlClass(node);
				posthtmlClass.refine('foo');

				return node;
			});

			return tree;
		};
	};

	test('単一クラス・マッチ', async () => {
		expect((await posthtml([refine()]).process('<p class="foo"></p>')).html).toBe('<p></p>');
	});

	test('複数クラス・マッチ', async () => {
		expect(
			(
				await posthtml([refine()]).process(`<p class=" foo
				bar "></p>`)
			).html
		).toBe('<p class="bar"></p>');
	});

	test('単一クラス・マッチせず', async () => {
		expect((await posthtml([refine()]).process('<p class="bar"></p>')).html).toBe('<p class="bar"></p>');
	});

	test('複数クラス・マッチせず', async () => {
		expect(
			(
				await posthtml([refine()]).process(`<p class=" bar
				baz "></p>`)
			).html
		).toBe('<p class="bar baz"></p>');
	});
});
