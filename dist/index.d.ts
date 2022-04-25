import * as PostHTML from 'posthtml';
export default class {
    #private;
    /**
     * @param {object} node - Target node
     */
    constructor(node: PostHTML.Node);
    /**
     * Whether the node contains the specified class name
     *
     * @param {string} targetClassName - Class name
     *
     * @returns {boolean} Whether the target node contains the specified class name
     */
    contains(targetClassName: string): boolean;
    /**
     * Remove the specified class name
     *
     * @param {string} targetClassName - Class name
     */
    remove(targetClassName: string): void;
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
    refine(targetClassName: string): boolean;
}
//# sourceMappingURL=index.d.ts.map