import * as PostHTML from 'posthtml';

export default class {
	#node: PostHTML.Node;
	#classList: string[] | undefined;

	/**
	 * @param {object} node - Target node
	 */
	constructor(node: PostHTML.Node) {
		this.#node = node;
		this.#classList = node.attrs?.class?.trim().split(/[\t\n\f\r ]+/g);
	}

	/**
	 * Whether the node contains the specified class name
	 *
	 * @param {string} targetClassName - Class name
	 *
	 * @returns {boolean} Whether the target node contains the specified class name
	 */
	contains(targetClassName: string): boolean {
		const classList = this.#classList;

		if (classList === undefined) {
			/* class 属性がない場合 */
			return false;
		}

		if (!classList.includes(targetClassName)) {
			/* 当該クラス名がない場合 */
			return false;
		}

		return true;
	}

	/**
	 * Remove the specified class name
	 *
	 * @param {string} targetClassName - Class name
	 */
	remove(targetClassName: string): void {
		this.#classList = this.#classList?.filter((className) => className !== targetClassName && className !== '');
	}

	/**
	 * Refine node by specified class name
	 *
	 * <p class="foo bar"> → <p class="foo bar"> (return false)
	 * <p class="foo TARGET bar"> → <p class="foo bar"> (return true)
	 *
	 * @param {string} targetClassName - Class name
	 *
	 * @returns {boolean} Whether the target node contains the specified class name
	 */
	refine(targetClassName: string): boolean {
		const contains = this.contains(targetClassName);

		this.remove(targetClassName);

		/* 指定されたクラス名を除去した上で変換する */
		if (this.#node.attrs !== undefined) {
			// 型エラー防止のために if 文を入れているが、必ず中に入るはず
			const className = this.#classList?.join(' ');
			this.#node.attrs.class = className !== '' ? className : undefined;
		}

		return contains;
	}
}
