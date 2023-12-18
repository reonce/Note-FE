/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  if (nums.length < 2) return 0;
  const n = nums.length;
  let i = parseInt(Math.random() * n);
  while (i < nums.length) {
    if (
      (!nums[i - 1] && nums[i - 1] !== 0 && nums[i] > nums[i + 1]) ||
      (!nums[i + 1] && nums[i + 1] !== 0 && nums[i] > nums[i - 1])
    ) {
      return i;
    }
    if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
      return i;
    } else if (nums[i] < nums[i + 1]) {
      i++;
    } else if (nums[i] < nums[i - 1]) {
      i--;
    }
  }
};
