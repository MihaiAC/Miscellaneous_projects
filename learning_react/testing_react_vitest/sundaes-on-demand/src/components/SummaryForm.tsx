export default function SummaryForm() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col-reverse space-y-4">
        <input type="checkbox" id="confirm-order-checkbox" />
        <label htmlFor="confirm-order-checkbox">Terms and conditions</label>
      </div>
      <div>
        <button disabled className="bg-red-400 p-2 rounded-md hover:opacity-90">
          Confirm order
        </button>
      </div>
    </div>
  );
}
