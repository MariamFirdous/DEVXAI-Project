window.RideNovaComparison = {
  buildComparison({ distance, vehicle }) {
    const dataset = window.RideNovaData;
    const rates = dataset.vehicleRates[vehicle];

    const rideNovaFare = dataset.baseFare + distance * rates.RideNova;

    const services = ["Ola", "Uber", "Rapido"].map((service) => {
      const fare = dataset.baseFare + distance * rates[service];
      const saving = Math.round(fare - rideNovaFare);

      return {
        name: service,
        fare: Math.round(fare),
        saving,
        color: dataset.serviceColors[service]
      };
    });

    return {
      rideNovaFare: Math.round(rideNovaFare),
      services,
      bestSavings: Math.max(...services.map((service) => service.saving))
    };
  },

  render(container, { distance, vehicle }) {
    const comparison = this.buildComparison({ distance, vehicle });

    const cards = comparison.services
      .map(
        (service) => `
          <div class="compare-card ${service.saving > 0 ? "costlier" : ""}">
            <div class="compare-header">
              <span class="service-pill" style="background:${service.color};">${service.name}</span>
              <strong>₹${service.fare}</strong>
            </div>
            <p>
              ${service.saving > 0
                ? `RideNova saves ₹${service.saving} vs ${service.name}`
                : `RideNova is ₹${Math.abs(service.saving)} more than ${service.name}`}
            </p>
          </div>
        `
      )
      .join("");

    container.innerHTML = `
      <div class="compare-summary">
        <h3>Price Comparison</h3>
        <p>RideNova is the best-value option for this trip.</p>
      </div>
      <div class="compare-grid">
        <div class="compare-card winner">
          <div class="compare-header">
            <span class="service-pill" style="background:${window.RideNovaData.serviceColors.RideNova};">RideNova</span>
            <strong>₹${comparison.rideNovaFare}</strong>
          </div>
          <p>Lowest fare for your ${vehicle} ride.</p>
        </div>
        ${cards}
      </div>
      <div class="compare-insight">
        RideNova saves up to ₹${comparison.bestSavings} compared with other popular ride apps.
      </div>
    `;
  }
};
